import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackLineContactClick,
  trackLoginClick,
  trackRegisterClick,
} from "../client/src/lib/analytics";

const projectRoot = resolve(import.meta.dirname, "..");
const readSource = (path: string) => readFileSync(resolve(projectRoot, path), "utf8");

describe("CTA analytics tracking", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("emits labeled CTA events through GTM dataLayer", () => {
    const dataLayer: Record<string, string>[] = [];
    vi.stubGlobal("window", { dataLayer });

    trackRegisterClick("hero", "สมัครสมาชิก");
    trackLoginClick("header", "เข้าสู่ระบบ");
    trackLineContactClick("floating-button", "ติดต่อเจ้าหน้าที่ LINE");

    expect(dataLayer).toEqual([
      {
        event: "sign_up_click",
        event_category: "conversion",
        event_label: "สมัครสมาชิก",
        button_location: "hero",
        cta_label: "สมัครสมาชิก",
        cta_destination: "line",
      },
      {
        event: "login_click",
        event_category: "engagement",
        event_label: "เข้าสู่ระบบ",
        button_location: "header",
        cta_label: "เข้าสู่ระบบ",
        cta_destination: "line",
      },
      {
        event: "line_contact_click",
        event_category: "engagement",
        event_label: "ติดต่อเจ้าหน้าที่ LINE",
        button_location: "floating-button",
        cta_label: "ติดต่อเจ้าหน้าที่ LINE",
        cta_destination: "line",
      },
    ]);
  });

  it("tracks high-intent CTAs across the homepage and SEO landing pages", () => {
    const sources = [
      "client/src/components/StickyPromoBar.tsx",
      "client/src/components/PromotionsCarousel.tsx",
      "client/src/components/LineFloatingButton.tsx",
      "client/src/components/Footer.tsx",
      "client/src/pages/DemoSlot.tsx",
      "client/src/pages/FreeCreditPage.tsx",
      "client/src/pages/Slot789Page.tsx",
      "client/src/pages/Promotions.tsx",
      "client/src/pages/Articles.tsx",
    ].map(readSource);

    for (const source of sources) {
      expect(source).toContain("track");
    }

    expect(sources.join("\n")).toContain('trackRegisterClick("sticky-promo-bar", "สมัครเลย")');
    expect(sources.join("\n")).toContain('trackLineContactClick("footer", label)');
    expect(sources.join("\n")).toContain('trackRegisterClick("demo-slot-hero", "สมัครเล่นจริง รับโบนัส")');
    expect(sources.join("\n")).toContain('trackRegisterClick("free-credit-hero", "รับเครดิตฟรีเลย")');
    expect(sources.join("\n")).toContain('trackRegisterClick("slot789-hero", "สมัครผ่าน LINE")');
  });
});
