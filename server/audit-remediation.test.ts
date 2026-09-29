import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFileSync(resolve(projectRoot, relativePath), "utf8");
const legacyDomain = ["rgb789", ".me"].join("");

describe("audit remediation contract", () => {
  it("removes the retired admin, click-tracking, and Telegram runtime surfaces", () => {
    expect(existsSync(resolve(projectRoot, "client/src/pages/AdminRoute.tsx"))).toBe(false);
    expect(existsSync(resolve(projectRoot, "client/src/pages/AdminDashboard.tsx"))).toBe(false);
    expect(existsSync(resolve(projectRoot, "client/src/hooks/useRegisterTracking.ts"))).toBe(false);
    expect(existsSync(resolve(projectRoot, "api/track-registration.ts"))).toBe(false);
    expect(existsSync(resolve(projectRoot, "server/telegram.ts"))).toBe(false);
    expect(read("client/src/App.tsx")).not.toContain("/admin");
    expect(read("server/routers.ts")).not.toContain("adminLogin");
    expect(read("server/routers.ts")).not.toContain("tracking:");
    expect(read("vercel.json")).not.toContain("track-registration");
  });

  it("keeps the public build free of retired analytics placeholders and stale domain copy", () => {
    expect(read("client/index.html")).not.toContain("%VITE_");
    expect(read("client/index.html")).not.toContain("umami");
    for (const relativePath of [
      "client/src/lib/constants.ts",
      "client/src/components/Footer.tsx",
      "client/src/components/MarqueeBar.tsx",
      "vercel.json",
    ]) {
      expect(read(relativePath), relativePath).not.toContain(legacyDomain);
    }
  });

  it("removes placeholder legal links and provides a noindex 404 document", () => {
    expect(read("client/src/components/Footer.tsx")).not.toContain('href: "#"');
    expect(read("client/src/components/Footer.tsx")).not.toContain('href="#"');
    expect(read("client/public/404.html")).toContain('name="robots" content="noindex, nofollow"');
  });
});
