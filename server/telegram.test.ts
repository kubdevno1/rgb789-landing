import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { buildRegisterClickMessage, sendTelegramNotification } from "./telegram";

describe("buildRegisterClickMessage", () => {
  it("builds a message with all fields", () => {
    const msg = buildRegisterClickMessage({
      device: "mobile",
      platform: "iOS",
      source: "hero_register_button",
      userAgent: "Mozilla/5.0 (iPhone)",
      timestamp: new Date("2025-04-07T10:00:00Z"),
      totalCount: 42,
    });

    expect(msg).toContain("มีผู้กดปุ่มสมัคร RGB789");
    expect(msg).toContain("mobile");
    expect(msg).toContain("iOS");
    expect(msg).toContain("hero_register_button");
    expect(msg).toContain("42");
  });

  it("builds a message with minimal fields", () => {
    const msg = buildRegisterClickMessage({
      timestamp: new Date("2025-04-07T10:00:00Z"),
    });

    expect(msg).toContain("มีผู้กดปุ่มสมัคร RGB789");
    expect(msg).toContain("unknown");
    expect(msg).not.toContain("ยอดรวมทั้งหมด");
  });
});

describe("sendTelegramNotification", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns false when bot token is missing", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    const result = await sendTelegramNotification("test message");
    expect(result).toBe(false);
  });

  it("calls Telegram API with correct params when credentials are set", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test_token";
    process.env.TELEGRAM_CHAT_ID = "123456";

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await sendTelegramNotification("test message");

    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest_token/sendMessage",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("test message"),
      })
    );
  });

  it("returns false when Telegram API returns error", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "bad_token";
    process.env.TELEGRAM_CHAT_ID = "123456";

    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => "Unauthorized",
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await sendTelegramNotification("test message");
    expect(result).toBe(false);
  });
});
