import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("hero image delivery", () => {
  it("serves the local WebP hero asset with an HTML preload hint", () => {
    const heroSource = readFileSync(
      resolve(projectRoot, "client/src/components/HeroSection.tsx"),
      "utf8",
    );
    const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

    expect(heroSource).toContain('src="/images/hero/hero-banner.webp"');
    expect(heroSource).not.toContain("manus-storage");
    expect(heroSource).toContain('sizes="100vw"');
    expect(heroSource).toContain('fetchPriority="high"');
    expect(htmlSource).toContain('rel="preload"');
    expect(htmlSource).toContain('href="/images/hero/hero-banner.webp"');
    expect(htmlSource).not.toContain("image/avif");
  });

  it("registers the manuscript storage proxy before application routes", () => {
    const serverSource = readFileSync(resolve(projectRoot, "server/_core/index.ts"), "utf8");
    const proxySource = readFileSync(resolve(projectRoot, "server/_core/storageProxy.ts"), "utf8");

    expect(serverSource.indexOf("registerStorageProxy(app)")).toBeLessThan(
      serverSource.indexOf("registerOAuthRoutes(app)"),
    );
    expect(proxySource).toContain('app.get("/manus-storage/*"');
    expect(proxySource).toContain('res.redirect(307, url)');
  });
});
