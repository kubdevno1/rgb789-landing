import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = resolve(import.meta.dirname, "..");
const routeManifest = readFileSync(resolve(repoRoot, "client/src/ssr/routeManifest.ts"), "utf8");
const indexHtml = readFileSync(resolve(repoRoot, "client/index.html"), "utf8");
const appSource = readFileSync(resolve(repoRoot, "client/src/App.tsx"), "utf8");

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
});
