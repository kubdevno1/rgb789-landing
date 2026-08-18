import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(
  resolve(process.cwd(), "client/src/components/BottomNavBar.tsx"),
  "utf8",
);

describe("BottomNavBar center logo", () => {
  it("uses a circular floating action button for the home logo", () => {
    expect(source).toContain('"relative z-10 -mt-6 rounded-full sm:-mt-7"');
    expect(source).toContain('"w-14 h-14 rounded-full');
    expect(source).toContain("sm:w-16 sm:h-16");
    expect(source).toContain('className="grid grid-cols-5 h-20 gap-1.5 px-2 py-2"');
    expect(source).toContain('className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"');
  });

  it("keeps the RGB789 logo visible without square cropping", () => {
    expect(source).toContain("rounded-full object-contain");
    expect(source).toContain("relative overflow-hidden p-1.5");
    expect(source).toContain('aria-label={item.isLogo ? "หน้าหลัก RGB789" : item.label}');
  });

  it("fits the circular button in every supported narrow mobile grid", () => {
    const logoSize = 56; // w-14 below the sm breakpoint
    const sidePadding = 16; // px-2
    const gapTotal = 24; // four 6px gaps from gap-1.5

    [320, 390, 430].forEach((viewportWidth) => {
      const gridColumnWidth = (viewportWidth - sidePadding - gapTotal) / 5;
      expect(gridColumnWidth).toBeGreaterThanOrEqual(logoSize);
    });
  });
});
