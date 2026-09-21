import { trpc } from "@/lib/trpc";

import { useCallback } from "react";
import type { AppRouter } from "@/../../server/routers";

type TrackingClient = {
  tracking: {
    recordClick: {
      mutate: (input: {
        device: "mobile" | "desktop" | "tablet";
        platform: string;
        source: string;
        userAgent?: string;
        referrer?: string;
      }) => Promise<unknown>;
    };
  };
};

let trackingClientPromise: Promise<TrackingClient> | null = null;

function getTrackingClient() {
  if (!trackingClientPromise) {
    trackingClientPromise = Promise.all([import("@trpc/client"), import("superjson")]).then(
      ([{ createTRPCProxyClient, httpBatchLink }, { default: superjson }]) =>
        createTRPCProxyClient<AppRouter>({
          links: [
            httpBatchLink({
              url: "/api/trpc",
              transformer: superjson,
              fetch(input, init) {
                return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" });
              },
            }),
          ],
        }) as TrackingClient,
    );
  }

  return trackingClientPromise;
}

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
  const trackClick = useCallback((source?: string) => {
    void getTrackingClient()
      .then((client) =>
        client.tracking.recordClick.mutate({
          device: detectDevice(),
          platform: detectPlatform(),
          source: source ?? "unknown",
          userAgent: navigator.userAgent,
          referrer: document.referrer || undefined,
        }),
      )
      .catch((error) => console.error("[Register Tracking Error]", error));
  }, []);

  return { trackClick };
}
