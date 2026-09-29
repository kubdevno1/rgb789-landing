import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "..");
const routeManifest = readFileSync(resolve(repoRoot, "client/src/ssr/routeManifest.ts"), "utf8");
const indexHtml = readFileSync(resolve(repoRoot, "client/index.html"), "utf8");
const appSource = readFileSync(resolve(repoRoot, "client/src/App.tsx"), "utf8");
const seoHook = readFileSync(resolve(repoRoot, "client/src/hooks/useSEO.ts"), "utf8");
const homeSource = readFileSync(resolve(repoRoot, "client/src/pages/Home.tsx"), "utf8");
const promotionsSource = readFileSync(resolve(repoRoot, "client/src/pages/Promotions.tsx"), "utf8");
const articlesSource = readFileSync(resolve(repoRoot, "client/src/pages/Articles.tsx"), "utf8");
const sitemap = readFileSync(resolve(repoRoot, "client/public/sitemap.xml"), "utf8");

const routes = ["/", "/demo-slot", "/free-credit", "/slot789", "/promotions", "/articles"];

describe("SEO prerender contract", () => {
  it("keeps the six canonical routes in the shared manifest", () => {
    for (const route of routes) {
      expect(routeManifest).toContain(`\"${route}\"`);
    }
    expect(routeManifest).toContain("PRERENDER_ROUTES");
  });

  it("keeps route-specific SEO ownership out of the static shell", () => {
    expect(indexHtml).toContain("<!--app-head-->");
    expect(indexHtml).toContain("<!--app-html-->");
    expect(indexHtml).toContain('src=\"/src/entry-client.tsx\"');
    expect(indexHtml).not.toContain("<title>");
    expect(indexHtml).not.toContain('rel=\"canonical\"');
    expect(indexHtml).not.toContain('property=\"og:title\"');
  });

  it("statically imports every public prerender route to avoid Suspense fallback HTML", () => {
    for (const routeComponent of ["Promotions", "Articles", "DemoSlot", "FreeCreditPage", "Slot789Page"]) {
      expect(appSource).toContain(`import ${routeComponent} from \"./pages/${routeComponent}\"`);
    }
    expect(appSource).not.toContain("const Promotions = lazy");
    expect(appSource).not.toContain("const Articles = lazy");
    expect(appSource).not.toContain("const DemoSlot = lazy");
    expect(appSource).not.toContain("const FreeCreditPage = lazy");
    expect(appSource).not.toContain("const Slot789Page = lazy");
  });

  it("keeps social images absolute and route metadata centralized", () => {
    expect(routeManifest).toContain("ogImageAlt");
    expect(routeManifest).not.toMatch(/ogImage:\s*"\//);
    expect(seoHook).toContain('hreflang="th"');
    expect(indexHtml).not.toContain('rel="alternate"');
  });

  it("does not publish stale article dates or unsupported FAQ schema from the home page", () => {
    expect(homeSource).not.toContain('"@type": "FAQPage"');
    expect(homeSource).not.toContain("datePublished");
    expect(homeSource).not.toContain("dateModified");
  });

  it("provides collection schema for the two collection pages", () => {
    expect(promotionsSource).toContain('"@type": "CollectionPage"');
    expect(articlesSource).toContain('"@type": "CollectionPage"');
  });

  it("keeps sitemap freshness aligned with this remediation", () => {
    expect(sitemap).not.toContain("2026-09-21");
    expect(sitemap.match(/<loc>/g)).toHaveLength(6);
  });
});
