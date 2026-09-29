import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const publicDir = resolve(projectRoot, "client/public");
const salePage = readFileSync(resolve(publicDir, "rgb789-me-sale.html"), "utf8");
const indexHtml = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("RGB789.me standalone Sale Page", () => {
  it("contains canonical SEO metadata and the active GTM container", () => {
    expect(salePage).toContain('<link rel="canonical" href="https://rgb789.me/" />');
    expect(salePage).toContain('content="index, follow"');
    expect(salePage).toContain("GTM-WV5GFZJ7");
  });

  it("sends primary conversion CTAs to the configured LINE account safely", () => {
    const lineCtas = salePage.match(/href="https:\/\/line\.me\/ti\/p\/@311ukzxq"/g) ?? [];
    expect(lineCtas).toHaveLength(2);
    expect(salePage).toContain('target="_blank" rel="noopener noreferrer"');
    expect(salePage).toContain("line_contact_click");
  });

  it("redirects the Manus static shell to the Sale Page only for rgb789.me hosts", () => {
    expect(indexHtml).toContain('"rgb789.me", "www.rgb789.me"');
    expect(indexHtml).toContain('window.location.replace("/rgb789-me-sale.html")');
    expect(indexHtml).toContain('!window.location.pathname.endsWith("/rgb789-me-sale.html")');
  });

  it("keeps the sitemap limited to the one canonical sale-page URL", () => {
    const sitemap = readFileSync(resolve(publicDir, "sitemap-rgb789-me.xml"), "utf8");
    expect(sitemap).toContain("https://rgb789.me/");
    expect(sitemap.match(/<loc>/g)).toHaveLength(1);
  });
});
