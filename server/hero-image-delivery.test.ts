import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("hero image delivery", () => {
  it("serves responsive AVIF sources with an image fallback and HTML preload hints", () => {
    const heroSource = readFileSync(
      resolve(projectRoot, "client/src/components/HeroSection.tsx"),
      "utf8",
    );
    const htmlSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

    expect(heroSource).toContain("<picture");
    expect(heroSource).toContain("rgb789-hero-768_ad4a12e0.avif");
    expect(heroSource).toContain("rgb789-hero-1440_9ce727ad.avif");
    expect(heroSource).toContain('sizes="100vw"');
    expect(htmlSource).toContain('rel="preload"');
    expect(htmlSource).toContain('type="image/avif"');
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
