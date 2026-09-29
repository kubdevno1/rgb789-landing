import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const publicDir = resolve(import.meta.dirname, "../client/public");
const salePage = readFileSync(resolve(publicDir, "rgb789-me-sale.html"), "utf8");

describe("RGB789.me standalone Sale Page", () => {
  it("contains canonical SEO metadata and the existing GTM container", () => {
    expect(salePage).toContain('<link rel="canonical" href="https://rgb789.me/" />');
    expect(salePage).toContain('content="index, follow"');
    expect(salePage).toContain("GTM-WV5GFZJ7");
  });

  it("sends every primary conversion CTA to the configured LINE account safely", () => {
    const lineCtas = salePage.match(/href="https:\/\/line\.me\/ti\/p\/@311ukzxq"/g) ?? [];
    expect(lineCtas).toHaveLength(2);
    expect(salePage).toContain('target="_blank" rel="noopener noreferrer"');
    expect(salePage).toContain("line_contact_click");
  });

  it("keeps the sitemap limited to the one canonical sale-page URL", () => {
    const sitemap = readFileSync(resolve(publicDir, "sitemap-rgb789-me.xml"), "utf8");
    expect(sitemap).toContain("https://rgb789.me/");
    expect(sitemap.match(/<loc>/g)).toHaveLength(1);
  });
});
