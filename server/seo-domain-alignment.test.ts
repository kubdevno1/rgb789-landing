import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

const canonicalDomain = "https://rgb789.fun";
const legacyDomain = ["https://rgb789", ".me"].join("");
const seoFiles = [
  "client/index.html",
  "client/public/robots.txt",
  "client/public/sitemap.xml",
  "client/src/lib/constants.ts",
  "client/src/components/Breadcrumb.tsx",
  "client/src/components/PromoPopup.tsx",
  "client/src/pages/Home.tsx",
  "client/src/pages/DemoSlot.tsx",
  "client/src/pages/FreeCreditPage.tsx",
  "client/src/pages/Slot789Page.tsx",
  "client/src/pages/Promotions.tsx",
  "client/src/pages/Articles.tsx",
  "client/src/ssr/routeManifest.ts",
];

describe("rgb789.fun canonical SEO alignment", () => {
  it("uses rgb789.fun throughout public metadata, schemas, and sharing URLs", () => {
    for (const file of seoFiles) {
      const source = readProjectFile(file);
      expect(source, file).not.toContain(legacyDomain);
    }

    expect(readProjectFile("client/src/ssr/routeManifest.ts")).toContain(
      "CANONICAL_ORIGIN"
    );
    expect(readProjectFile("client/index.html")).not.toContain(
      'rel="canonical"'
    );
    expect(readProjectFile("client/public/robots.txt")).toContain(
      "Sitemap: https://rgb789.fun/sitemap.xml"
    );
  });

  it("includes only canonical rgb789.fun URLs in the sitemap", () => {
    const sitemap = readProjectFile("client/public/sitemap.xml");
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1]
    );

    expect(locations).toHaveLength(6);
    expect(locations.every((url) => url?.startsWith(canonicalDomain))).toBe(true);
    expect(sitemap).not.toContain(legacyDomain);
  });

  it("redirects Thai URL aliases to their canonical Vercel paths", () => {
    const vercelConfig = JSON.parse(readProjectFile("vercel.json")) as {
      redirects?: Array<{ source: string; destination: string; permanent: boolean }>;
    };

    expect(vercelConfig.redirects).toEqual(
      expect.arrayContaining([
        {
          source: "/%E0%B8%97%E0%B8%94%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%95",
          destination: "/demo-slot",
          permanent: true,
        },
        {
          source: "/%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95",
          destination: "/free-credit",
          permanent: true,
        },
      ])
    );
  });
});
