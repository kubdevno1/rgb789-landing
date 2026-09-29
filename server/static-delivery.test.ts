import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const read = (relativePath: string) =>
  readFileSync(resolve(projectRoot, relativePath), "utf8");

describe("production static delivery", () => {
  it("uses immutable caching for hashed assets and short revalidation for HTML", () => {
    const source = read("server/index.ts");

    expect(source).toContain('"/assets"');
    expect(source).toContain("immutable: true");
    expect(source).toContain('maxAge: "1y"');
    expect(source).toContain("index: false");
    expect(source).toContain("stale-while-revalidate=86400");
  });

  it("includes a production build marker for deployment verification", () => {
    const html = read("client/index.html");
    expect(html).toContain('name="rgb789-build-id"');
    expect(html).toContain("promo-performance-edaed22b");
  });

  it("uses a noindex custom 404 document and does not rewrite unknown routes to the SPA", () => {
    const source = read("server/index.ts");
    const notFound = read("client/public/404.html");

    expect(source).toContain("res.status(404)");
    expect(source).toContain("404.html");
    expect(notFound).toContain('name="robots" content="noindex, nofollow"');
    expect(notFound).toContain("ไม่พบหน้าที่คุณกำลังค้นหา");
  });

  it("keeps rgb789.me as a host-specific Sale Page without changing rgb789.fun routes", () => {
    const source = read("server/index.ts");

    expect(source).toContain('"rgb789-me-sale.html"');
    expect(source).toContain("shouldServeRgb789MeSalePage");
    expect(source).toContain('req.hostname === "rgb789.me"');
    expect(source).toContain('req.hostname === "www.rgb789.me"');
  });

  it("removes the dormant fullstack runtime boundary", () => {
    for (const relativePath of [
      "server/_core/index.ts",
      "server/routers.ts",
      "server/db.ts",
      "server/storage.ts",
      "drizzle/schema.ts",
      "client/src/lib/trpc.ts",
      "client/src/_core/hooks/useAuth.ts",
    ]) {
      expect(existsSync(resolve(projectRoot, relativePath)), relativePath).toBe(false);
    }
  });
});
