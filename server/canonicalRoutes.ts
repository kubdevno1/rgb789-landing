const CANONICAL_ROUTE_REDIRECTS: Record<string, string> = {
  "/ทดลองเล่นสล็อต": "/demo-slot",
  "/เครดิตฟรี": "/free-credit",
};

/**
 * Returns the canonical URL for legacy Thai aliases while preserving query strings.
 * Returns undefined when the requested path is already canonical or not an alias.
 */
export function getCanonicalRedirect(originalUrl: string): string | undefined {
  const [rawPathname, query = ""] = originalUrl.split("?", 2);
  const pathname = decodeURIComponent(rawPathname || "/");
  const canonicalPath = CANONICAL_ROUTE_REDIRECTS[pathname];

  if (!canonicalPath) return undefined;

  return query ? `${canonicalPath}?${query}` : canonicalPath;
}

export { CANONICAL_ROUTE_REDIRECTS };
