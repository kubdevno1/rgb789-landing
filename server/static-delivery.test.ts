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
});
