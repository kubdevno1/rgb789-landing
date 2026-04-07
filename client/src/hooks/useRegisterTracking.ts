import { trpc } from "@/lib/trpc";

// Detect device type from user agent
function detectDevice(): "mobile" | "desktop" | "tablet" {
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

export function useRegisterTracking() {
  const mutation = trpc.tracking.recordClick.useMutation();

  const trackClick = (source?: string) => {
    mutation.mutate({
      device: detectDevice(),
      platform: detectPlatform(),
      source: source ?? "unknown",
      userAgent: navigator.userAgent,
      referrer: document.referrer || undefined,
    });
  };

  return { trackClick };
}
