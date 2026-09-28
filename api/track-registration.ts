const ALLOWED_ORIGINS = new Set([
  "https://rgb789.fun",
  "https://www.rgb789.fun",
]);

const TELEGRAM_API = "https://api.telegram.org";

export type RegistrationClickPayload = {
  device?: string;
  platform?: string;
  source?: string;
  userAgent?: string;
  referrer?: string;
};

function cleanText(value: unknown, fallback: string, maxLength = 160): string {
  if (typeof value !== "string") return fallback;
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized ? normalized.slice(0, maxLength) : fallback;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}

export function buildRegistrationMessage(payload: RegistrationClickPayload): string {
  const time = new Intl.DateTimeFormat("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

  const device = escapeHtml(cleanText(payload.device, "unknown", 32));
  const platform = escapeHtml(cleanText(payload.platform, "unknown", 64));
  const source = escapeHtml(cleanText(payload.source, "unknown", 128));

  return [
    "🔔 <b>มีผู้กดปุ่มสมัคร RGB789!</b>",
    "",
    `⏰ <b>เวลา:</b> ${time}`,
    `📱 <b>อุปกรณ์:</b> ${device}`,
    `💻 <b>Platform:</b> ${platform}`,
    `📍 <b>Source:</b> ${source}`,
  ].join("\n");
}

function jsonResponse(body: Record<string, unknown>, status: number, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

export function OPTIONS(request: Request): Response {
  const origin = request.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      vary: "origin",
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse({ success: false, error: "Forbidden origin" }, 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ success: false, error: "Expected JSON payload" }, 415);
  }

  let payload: RegistrationClickPayload;
  try {
    payload = (await request.json()) as RegistrationClickPayload;
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON payload" }, 400);
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.error("[Registration notification] Telegram credentials are not configured");
    return jsonResponse({ success: false, error: "Notification service unavailable" }, 503);
  }

  try {
    const telegramResponse = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildRegistrationMessage(payload),
        parse_mode: "HTML",
      }),
    });

    if (!telegramResponse.ok) {
      console.error("[Registration notification] Telegram API rejected the request", {
        status: telegramResponse.status,
      });
      return jsonResponse({ success: false, error: "Notification delivery failed" }, 502);
    }

    return jsonResponse({ success: true }, 202);
  } catch (error) {
    console.error("[Registration notification] Telegram request failed", error);
    return jsonResponse({ success: false, error: "Notification delivery failed" }, 502);
  }
}
