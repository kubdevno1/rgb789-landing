import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("production static delivery", () => {
  it("uses immutable caching for hashed assets and a short revalidation policy for HTML", () => {
    const source = readFileSync(resolve(import.meta.dirname, "_core/vite.ts"), "utf8");

    expect(source).toContain('"/assets"');
    expect(source).toContain('immutable: true');
    expect(source).toContain('maxAge: "1y"');
    expect(source).toContain('index: false');
    expect(source).toContain("stale-while-revalidate=86400");
  });

  it("includes a production build marker for deployment verification", () => {
    const html = readFileSync(resolve(import.meta.dirname, "../client/index.html"), "utf8");
    expect(html).toContain('name="rgb789-build-id"');
    expect(html).toContain("promo-performance-edaed22b");
  });

  it("uses a noindex custom 404 document and does not rewrite unknown routes to the SPA", () => {
    const source = readFileSync(resolve(import.meta.dirname, "_core/vite.ts"), "utf8");
    const notFound = readFileSync(resolve(import.meta.dirname, "../client/public/404.html"), "utf8");

    expect(source).toContain("res.status(404)");
    expect(source).toContain("404.html");
    expect(notFound).toContain('name="robots" content="noindex, nofollow"');
    expect(notFound).toContain("ไม่พบหน้าที่คุณกำลังค้นหา");
  });
});
