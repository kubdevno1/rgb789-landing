import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db module
vi.mock("./db", () => ({
  insertRegisterClick: vi.fn().mockResolvedValue(undefined),
  getRegisterClickStats: vi.fn().mockResolvedValue({
    total: 5,
    byDay: [{ day: "2025-01-01", count: 5 }],
    byHour: [{ hour: 10, count: 3 }, { hour: 14, count: 2 }],
    byDevice: [{ device: "mobile", count: 3 }, { device: "desktop", count: 2 }],
    recent: [],
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const ADMIN_TOKEN = Buffer.from("rgbmaster:Boss789rgb").toString("base64");

describe("auth.adminLogin", () => {
  it("returns token on valid credentials", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.auth.adminLogin({ username: "rgbmaster", password: "Boss789rgb" });
    expect(result.success).toBe(true);
    expect(result.token).toBe(ADMIN_TOKEN);
  });

  it("throws UNAUTHORIZED on invalid credentials", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.auth.adminLogin({ username: "wrong", password: "wrong" })
    ).rejects.toThrow("Invalid credentials");
  });
});

describe("tracking.recordClick", () => {
  it("records a click with all fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.tracking.recordClick({
      device: "mobile",
      platform: "iOS",
      source: "hero_register_button",
      userAgent: "Mozilla/5.0 (iPhone)",
      referrer: "https://google.com",
    });
    expect(result.success).toBe(true);
  });

  it("records a click with minimal fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.tracking.recordClick({});
    expect(result.success).toBe(true);
  });
});

describe("tracking.getStats", () => {
  it("returns stats with valid admin token", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.tracking.getStats({ token: ADMIN_TOKEN });
    expect(result.total).toBe(5);
    expect(result.byDay).toHaveLength(1);
    expect(result.byDevice).toHaveLength(2);
  });

  it("throws UNAUTHORIZED with invalid token", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.tracking.getStats({ token: "invalid_token" })
    ).rejects.toThrow("Invalid admin token");
  });
});
