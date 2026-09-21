import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("Google Tag Manager installation", () => {
  it("places the GTM loader immediately after the opening head tag", () => {
    const headIndex = indexHtml.indexOf("<head>");
    const loaderIndex = indexHtml.indexOf("Google Tag Manager -->");

    expect(loaderIndex).toBeGreaterThan(headIndex);
    expect(indexHtml.slice(headIndex, loaderIndex)).not.toContain("<meta");
    expect(indexHtml).toContain("GTM-WV5GFZJ7");
    expect(indexHtml).toContain("https://www.googletagmanager.com/gtm.js?id=");
  });

  it("places the noscript iframe immediately after the opening body tag", () => {
    const bodyIndex = indexHtml.indexOf("<body>");
    const noscriptIndex = indexHtml.indexOf("Google Tag Manager (noscript)");
    const rootIndex = indexHtml.indexOf('<div id="root">');

    expect(noscriptIndex).toBeGreaterThan(bodyIndex);
    expect(noscriptIndex).toBeLessThan(rootIndex);
    expect(indexHtml).toContain("https://www.googletagmanager.com/ns.html?id=GTM-WV5GFZJ7");
  });
});
