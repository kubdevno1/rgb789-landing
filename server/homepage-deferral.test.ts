import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("homepage deferred sections", () => {
  it("does not preload image-heavy below-the-fold sections far before they enter view", () => {
    const source = readFileSync(
      resolve(import.meta.dirname, "../client/src/pages/Home.tsx"),
      "utf8",
    );

    expect(source).toContain('rootMargin: "0px 0px 80px"');
    expect(source).not.toContain('rootMargin: "300px 0px"');
  });
});
