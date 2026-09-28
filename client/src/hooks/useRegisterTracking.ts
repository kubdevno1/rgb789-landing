import { useCallback } from "react";

type DeviceType = "mobile" | "desktop" | "tablet";

type RegistrationClickPayload = {
  device: DeviceType;
  platform: string;
  source: string;
  userAgent?: string;
  referrer?: string;
};

// Detect device type from user agent
function detectDevice(): DeviceType {
  const ua = navigator.userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk|(android(?!.*mobile))/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

// Detect platform
function detectPlatform(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Android/.test(ua)) return "Android";
  if (/Windows/.test(ua)) return "Windows";
  if (/Mac/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown";
}

async function notifyRegistrationClick(payload: RegistrationClickPayload): Promise<void> {
  const response = await fetch("/api/track-registration", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Registration notification failed with status ${response.status}`);
  }
}

/**
 * ส่ง event กดสมัครไปยัง Vercel Function ของ rgb789.fun โดยตรง
 * ไม่อ้างอิง API หรือฐานข้อมูลของ rgb789.me
 */
export function useRegisterTracking() {
  const trackClick = useCallback((source?: string) => {
    const payload: RegistrationClickPayload = {
      device: detectDevice(),
      platform: detectPlatform(),
      source: source ?? "unknown",
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
    };

    void notifyRegistrationClick(payload).catch(error =>
      console.error("[Register Tracking Error]", error),
    );
  }, []);

  return { trackClick };
}
