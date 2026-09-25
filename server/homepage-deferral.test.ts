import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("homepage deferred sections", () => {
  it("renders crawlable below-the-fold sections in the SSR tree", () => {
    const source = readFileSync(
      resolve(import.meta.dirname, "../client/src/pages/Home.tsx"),
      "utf8",
    );

    expect(source).toContain("const DeferredSection");
    expect(source).not.toContain("IntersectionObserver");
    expect(source).not.toContain("lazy(() => import");
  });
});
