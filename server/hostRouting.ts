const RGB789_ME_HOSTS = new Set(["rgb789.me", "www.rgb789.me"]);

function normalizeHost(host: string | undefined): string {
  return (host ?? "")
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/\.$/, "");
}

export function isRgb789MeHost(host: string | undefined): boolean {
  return RGB789_ME_HOSTS.has(normalizeHost(host));
}

/**
 * rgb789.me is intentionally a single Sale Page. Files with extensions remain
 * available so crawlers can request robots.txt and sitemap.xml normally.
 */
export function shouldServeRgb789MeSalePage(host: string | undefined, path: string): boolean {
  if (!isRgb789MeHost(host)) return false;
  return path === "/index.html" || !path.includes(".");
}
