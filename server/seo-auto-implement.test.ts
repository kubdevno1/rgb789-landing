import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

describe("SEO auto-implement batch 1 regression coverage", () => {
  it("does not publish a SearchAction for the unimplemented search route", () => {
    const homeSource = readProjectFile("client/src/pages/Home.tsx");

    expect(homeSource).not.toContain('"@type": "SearchAction"');
    expect(homeSource).not.toContain("potentialAction");
  });

  it("keeps every sitemap URL mapped to a canonical application route", () => {
    const sitemap = readProjectFile("client/public/sitemap.xml");
    const appSource = readProjectFile("client/src/App.tsx");
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]!).pathname,
    );

    expect(locations).toHaveLength(6);
    expect(new Set(locations).size).toBe(locations.length);
    expect(locations).toEqual(
      expect.arrayContaining([
        "/",
        "/demo-slot",
        "/free-credit",
        "/slot789",
        "/promotions",
        "/articles",
      ]),
    );

    for (const pathname of locations) {
      expect(appSource, pathname).toContain(`path={"${pathname}"}`);
    }
  });

  it("preserves the approved canonical host and crawl-control files", () => {
    expect(readProjectFile("client/index.html")).toContain(
      '<link rel="canonical" href="https://rgb789.fun/" />',
    );
    expect(readProjectFile("client/public/robots.txt")).toContain(
      "Sitemap: https://rgb789.fun/sitemap.xml",
    );
  });
});
