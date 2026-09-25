import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "dist", "public");
const templatePath = path.join(publicRoot, "index.html");
const ssrEntryPath = path.join(projectRoot, "dist", "server-ssr", "entry-server.js");

const {
  CANONICAL_ORIGIN,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
  PRERENDER_ROUTES,
  SITE_NAME,
  getRouteSeo,
  render,
} = await import(pathToFileURL(ssrEntryPath).href);

const template = await fs.readFile(templatePath, "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function meta(attribute, name, content) {
  return `<meta ${attribute}="${escapeHtml(name)}" content="${escapeHtml(content)}" />`;
}

function buildHead(seo) {
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;
  const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta("name", "description", seo.description),
    seo.keywords ? meta("name", "keywords", seo.keywords) : "",
    meta("name", "robots", robots),
    meta("property", "og:title", ogTitle),
    meta("property", "og:description", ogDescription),
    meta("property", "og:type", seo.ogType ?? "website"),
    meta("property", "og:url", seo.canonical),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:locale", OG_LOCALE),
    seo.ogImage ? meta("property", "og:image", seo.ogImage) : "",
    seo.ogImage ? meta("property", "og:image:width", String(OG_IMAGE_WIDTH)) : "",
    seo.ogImage ? meta("property", "og:image:height", String(OG_IMAGE_HEIGHT)) : "",
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", ogTitle),
    meta("name", "twitter:description", ogDescription),
    seo.ogImage ? meta("name", "twitter:image", seo.ogImage) : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}

for (const route of PRERENDER_ROUTES) {
  const seo = getRouteSeo(route);
  if (!seo) {
    throw new Error(`Missing route SEO metadata for ${route}`);
  }

  const { html } = render(route);
  const output = template
    .replace("<!--app-head-->", () => buildHead(seo))
    .replace("<!--app-html-->", () => html);
  const outputPath = route === "/" ? templatePath : path.join(publicRoot, route.slice(1), "index.html");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, output, "utf8");
  console.log(`[prerender] ${route} -> ${path.relative(projectRoot, outputPath)} (${output.length} bytes)`);
}

console.log(`[prerender] canonical origin: ${CANONICAL_ORIGIN}`);
