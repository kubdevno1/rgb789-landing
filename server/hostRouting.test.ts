import { describe, expect, it } from "vitest";
import { isRgb789MeHost, shouldServeRgb789MeSalePage } from "./hostRouting";

describe("RGB789.me host routing", () => {
  it("identifies only the Manus sale-page hostnames", () => {
    expect(isRgb789MeHost("rgb789.me")).toBe(true);
    expect(isRgb789MeHost("www.rgb789.me:443")).toBe(true);
    expect(isRgb789MeHost("RGB789.ME.")).toBe(true);
    expect(isRgb789MeHost("rgb789.fun")).toBe(false);
    expect(isRgb789MeHost("rgb789-landing.vercel.app")).toBe(false);
  });

  it("serves the sale page for HTML routes while keeping crawler files available", () => {
    expect(shouldServeRgb789MeSalePage("rgb789.me", "/")).toBe(true);
    expect(shouldServeRgb789MeSalePage("rgb789.me", "/promotions")).toBe(true);
    expect(shouldServeRgb789MeSalePage("www.rgb789.me", "/index.html")).toBe(true);
    expect(shouldServeRgb789MeSalePage("rgb789.me", "/robots.txt")).toBe(false);
    expect(shouldServeRgb789MeSalePage("rgb789.fun", "/")).toBe(false);
  });
});
