import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..");

describe("initial bundle boundaries", () => {
  it("keeps the tRPC and React Query providers out of the initial application entry", () => {
    const mainSource = readFileSync(resolve(projectRoot, "client/src/main.tsx"), "utf8");
    const adminRouteSource = readFileSync(resolve(projectRoot, "client/src/pages/AdminRoute.tsx"), "utf8");

    expect(mainSource).not.toContain("@tanstack/react-query");
    expect(mainSource).not.toContain("@trpc/client");
    expect(adminRouteSource).toContain("@tanstack/react-query");
    expect(adminRouteSource).toContain("@trpc/client");
  });

  it("keeps public SSR content static and avoids a blocking startup popup", () => {
    const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const trackingSource = readFileSync(
      resolve(projectRoot, "client/src/hooks/useRegisterTracking.ts"),
      "utf8",
    );
    const appSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");

    expect(homeSource).toContain('import GameCategories from "@/components/GameCategories"');
    expect(homeSource).not.toContain("const GameCategories = lazy");
    expect(homeSource).toContain("const DeferredSection");
    expect(trackingSource).toContain('fetch("/api/track-registration"');
    expect(trackingSource).not.toContain("@trpc/client");
    expect(trackingSource).not.toContain("/api/trpc");
    expect(appSource).not.toContain("PromoPopup");
    expect(appSource).not.toContain("showPromo");
    expect(appSource).not.toContain("<TooltipProvider>");
    expect(appSource).not.toContain("<Toaster />");
  });
});
