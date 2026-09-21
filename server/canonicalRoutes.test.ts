import { describe, expect, it } from "vitest";
import { getCanonicalRedirect } from "./canonicalRoutes";

describe("getCanonicalRedirect", () => {
  it("redirects the Thai demo slot alias to its canonical URL", () => {
    expect(getCanonicalRedirect("/ทดลองเล่นสล็อต")).toBe("/demo-slot");
  });

  it("redirects the Thai free credit alias and preserves query strings", () => {
    expect(getCanonicalRedirect("/เครดิตฟรี?source=google")).toBe(
      "/free-credit?source=google"
    );
  });

  it("leaves canonical and unrelated routes unchanged", () => {
    expect(getCanonicalRedirect("/demo-slot")).toBeUndefined();
    expect(getCanonicalRedirect("/slot789")).toBeUndefined();
  });
});
