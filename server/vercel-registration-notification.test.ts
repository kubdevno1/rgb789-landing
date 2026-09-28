import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OPTIONS, POST, buildRegistrationMessage } from "../api/track-registration";

const projectRoot = resolve(import.meta.dirname, "..");
const originalFetch = globalThis.fetch;
const originalToken = process.env.TELEGRAM_BOT_TOKEN;
const originalChatId = process.env.TELEGRAM_CHAT_ID;

function readClientSourceTree(directory: string): string {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap(entry => {
      const entryPath = resolve(directory, entry.name);
      if (entry.isDirectory()) return [readClientSourceTree(entryPath)];
      if (!statSync(entryPath).isFile() || !/\.(?:ts|tsx|html|css)$/.test(entry.name)) return [];
      return [readFileSync(entryPath, "utf8")];
    })
    .join("\n");
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
  else process.env.TELEGRAM_BOT_TOKEN = originalToken;
  if (originalChatId === undefined) delete process.env.TELEGRAM_CHAT_ID;
  else process.env.TELEGRAM_CHAT_ID = originalChatId;
});

describe("Vercel registration notification function", () => {
  it("builds a safe Telegram message from registration metadata", () => {
    const message = buildRegistrationMessage({
      device: "mobile",
      platform: "Android",
      source: "hero_<button>",
    });

    expect(message).toContain("มีผู้กดปุ่มสมัคร RGB789");
    expect(message).toContain("hero_&lt;button&gt;");
  });

  it("delivers same-origin registration events to Telegram without Manus runtime access", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456";
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    globalThis.fetch = fetchMock;

    const response = await POST(
      new Request("https://rgb789.fun/api/track-registration", {
        method: "POST",
        headers: {
          origin: "https://rgb789.fun",
          "content-type": "application/json",
        },
        body: JSON.stringify({ device: "desktop", platform: "Windows", source: "hero_register_button" }),
      }),
    );

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.telegram.org/bottest-token/sendMessage",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("rejects requests from untrusted origins before contacting Telegram", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "test-token";
    process.env.TELEGRAM_CHAT_ID = "123456";
    const fetchMock = vi.fn();
    globalThis.fetch = fetchMock;

    const response = await POST(
      new Request("https://rgb789.fun/api/track-registration", {
        method: "POST",
        headers: {
          origin: "https://untrusted.example",
          "content-type": "application/json",
        },
        body: JSON.stringify({ source: "hero_register_button" }),
      }),
    );

    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns an origin-limited preflight response", () => {
    const response = OPTIONS(
      new Request("https://rgb789.fun/api/track-registration", {
        method: "OPTIONS",
        headers: { origin: "https://www.rgb789.fun" },
      }),
    );

    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe("https://www.rgb789.fun");
  });

  it("keeps Vercel runtime independent from rgb789.me and the SPA fallback", () => {
    const vercelConfig = readFileSync(resolve(projectRoot, "vercel.json"), "utf8");
    const trackingHook = readFileSync(
      resolve(projectRoot, "client/src/hooks/useRegisterTracking.ts"),
      "utf8",
    );
    const clientSource = readClientSourceTree(resolve(projectRoot, "client"));

    expect(vercelConfig).not.toContain("https://rgb789.me");
    expect(vercelConfig).toContain('"source": "/((?!api/).*)"');
    expect(vercelConfig).toContain('"api/track-registration.ts"');
    expect(trackingHook).toContain('fetch("/api/track-registration"');
    expect(trackingHook).not.toContain("@trpc/client");
    expect(trackingHook).not.toContain("/api/trpc");
    expect(clientSource).not.toContain("/manus-storage/");
    expect(clientSource).not.toContain("d2xsxph8kpxj0f.cloudfront.net");
  });
});
