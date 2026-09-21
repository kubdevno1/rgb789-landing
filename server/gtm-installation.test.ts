import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const indexHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");
const analyticsSource = readFileSync(
  resolve(process.cwd(), "client/src/lib/analytics.ts"),
  "utf8"
);

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

  it("does not load GA4 directly outside of the GTM container", () => {
    expect(indexHtml).not.toContain("googletagmanager.com/gtag/js");
    expect(indexHtml).not.toContain("G-JQH95DB0KM");
    expect(indexHtml).not.toContain("gtag('config'");
  });

  it("routes custom events through GTM dataLayer instead of gtag", () => {
    expect(analyticsSource).not.toContain("window.gtag");
    expect(analyticsSource).toContain("window.dataLayer.push");
    expect(analyticsSource).toContain("event: eventName");
  });
});
