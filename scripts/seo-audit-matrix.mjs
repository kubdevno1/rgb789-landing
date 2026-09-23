#!/usr/bin/env node

import { writeFile } from "node:fs/promises";

const baseUrl = new URL(
  process.argv[2] || process.env.SEO_AUDIT_BASE_URL || "https://rgb789.fun",
);
const outputPath = process.argv[3] || "-";
const checkLinks = process.argv.includes("--check-links");

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function textContent(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function parseAttributes(tag) {
  const attributes = {};
  const attributePattern = /([:\w-]+)\s*=\s*(["'])(.*?)\2/g;
  for (const match of tag.matchAll(attributePattern)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[3]);
  }
  return attributes;
}

function extractFirst(html, pattern) {
  const match = html.match(pattern);
  return match ? textContent(match[1]) : "";
}

function extractMeta(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    if ((attributes.name || attributes.property || "").toLowerCase() === name.toLowerCase()) {
      return attributes.content || "";
    }
  }
  return "";
}

function extractCanonical(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    if ((attributes.rel || "").toLowerCase().split(/\s+/).includes("canonical")) {
      return attributes.href || "";
    }
  }
  return "";
}

function collectTypes(value, types = []) {
  if (!value || typeof value !== "object") return types;
  if (typeof value["@type"] === "string") types.push(value["@type"]);
  if (Array.isArray(value)) {
    for (const item of value) collectTypes(item, types);
  } else {
    for (const item of Object.values(value)) collectTypes(item, types);
  }
  return types;
}

function hasSearchAction(value) {
  if (!value || typeof value !== "object") return false;
  if (value["@type"] === "SearchAction") return true;
  if (Array.isArray(value)) return value.some(hasSearchAction);
  return Object.values(value).some(hasSearchAction);
}

function extractStructuredData(html) {
  const types = [];
  let searchAction = false;
  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const value = JSON.parse(match[1].trim());
      collectTypes(value, types);
      searchAction = searchAction || hasSearchAction(value);
    } catch {
      types.push("INVALID_JSON_LD");
    }
  }
  return { types: [...new Set(types)], searchAction };
}

function extractInternalLinks(html, origin) {
  const links = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const rawHref = decodeHtml(match[1]).trim();
    if (!rawHref || rawHref.startsWith("#") || /^(mailto|tel|javascript):/i.test(rawHref)) continue;
    try {
      const url = new URL(rawHref, origin);
      if (url.origin === origin.origin) {
        url.hash = "";
        links.add(url.href);
      }
    } catch {
      // Ignore malformed links; they are not part of the route matrix.
    }
  }
  return [...links].sort();
}

async function fetchPage(url) {
  const response = await fetch(url, { redirect: "follow" });
  const html = await response.text();
  const structuredData = extractStructuredData(html);
  return {
    url,
    finalUrl: response.url,
    status: response.status,
    bytes: Buffer.byteLength(html),
    title: extractFirst(html, /<title\b[^>]*>([\s\S]*?)<\/title>/i),
    description: extractMeta(html, "description"),
    canonical: extractCanonical(html),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
      textContent(match[1]),
    ),
    jsonLdTypes: structuredData.types,
    hasSearchAction: structuredData.searchAction,
    internalLinks: extractInternalLinks(html, baseUrl),
  };
}

async function fetchLinkStatus(url) {
  try {
    const response = await fetch(url, { redirect: "follow" });
    return { url, status: response.status, finalUrl: response.url };
  } catch (error) {
    return { url, status: 0, error: error instanceof Error ? error.message : String(error) };
  }
}

const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
if (!sitemapResponse.ok) throw new Error(`Sitemap request failed: ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const pages = await Promise.all(urls.map(fetchPage));
const internalUrls = [...new Set(pages.flatMap((page) => page.internalLinks))].sort();
const linkStatuses = checkLinks ? await Promise.all(internalUrls.map(fetchLinkStatus)) : [];
const brokenInternalLinks = linkStatuses.filter((link) => link.status < 200 || link.status >= 400);

const matrix = {
  capturedAt: new Date().toISOString(),
  baseUrl: baseUrl.href,
  sitemapUrl: new URL("/sitemap.xml", baseUrl).href,
  urlCount: urls.length,
  checkLinks,
  pages,
  internalLinkCount: internalUrls.length,
  checkedInternalLinks: linkStatuses,
  brokenInternalLinks,
};

const serialized = JSON.stringify(matrix, null, 2) + "\n";
if (outputPath === "-") process.stdout.write(serialized);
else await writeFile(outputPath, serialized, "utf8");

if (brokenInternalLinks.length > 0) process.exitCode = 2;
