/**
 * Telegram Bot notification service
 * Sends alerts when a user clicks the register button
 */

const TELEGRAM_API = "https://api.telegram.org";

export async function sendTelegramNotification(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[Telegram] Bot token or chat ID not configured");
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Telegram] Failed to send notification:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Telegram] Error sending notification:", error);
    return false;
  }
}

export function buildRegisterClickMessage(data: {
  device?: string;
  platform?: string;
  source?: string;
  userAgent?: string;
  timestamp: Date;
  totalCount?: number;
}): string {
  const time = data.timestamp.toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const device = data.device || "unknown";
  const platform = data.platform || "unknown";
  const source = data.source || "unknown";
  const total = data.totalCount ? `\n📊 <b>ยอดรวมทั้งหมด:</b> ${data.totalCount} ครั้ง` : "";

  return (
    `🔔 <b>มีผู้กดปุ่มสมัคร RGB789!</b>\n\n` +
    `⏰ <b>เวลา:</b> ${time}\n` +
    `📱 <b>อุปกรณ์:</b> ${device}\n` +
    `💻 <b>Platform:</b> ${platform}\n` +
    `📍 <b>Source:</b> ${source}` +
    total
  );
}
