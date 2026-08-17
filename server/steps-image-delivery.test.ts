import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("responsive signup-step images", () => {
  const source = readFileSync(
    resolve(import.meta.dirname, "../client/src/components/StepsSection.tsx"),
    "utf8",
  );

  it("uses AVIF sources for mobile and desktop step images", () => {
    expect(source).toContain('media="(max-width: 639px)"');
    expect(source).toContain('type="image/avif"');
    expect(source).toContain("step-01-320_1f7c6864.avif");
    expect(source).toContain("step-03-640_b71cc21e.avif");
  });

  it("keeps a lazy-loaded fallback with intrinsic dimensions", () => {
    expect(source).toContain('loading="lazy"');
    expect(source).toContain('width="640"');
    expect(source).toContain('height="640"');
    expect(source).toContain('sizes="(min-width: 1024px) 30vw');
  });
});
