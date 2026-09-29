import { useEffect } from "react";
import { useLocation } from "wouter";
import { getRouteSeo } from "@/ssr/routeManifest";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

export default function Head() {
  const [location] = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location);
    if (!seo) {
      document.title = "Page Not Found | RGB789";
      upsertMeta("name", "robots", "noindex, nofollow");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      return;
    }

    const ogTitle = seo.ogTitle ?? seo.title;
    const ogDescription = seo.ogDescription ?? seo.description;
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    if (seo.keywords) upsertMeta("name", "keywords", seo.keywords);
    upsertMeta("name", "robots", seo.noIndex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:title", ogTitle);
    upsertMeta("property", "og:description", ogDescription);
    upsertMeta("property", "og:type", seo.ogType ?? "website");
    upsertMeta("property", "og:url", seo.canonical);
    upsertMeta("property", "og:site_name", "RGB789");
    upsertMeta("property", "og:locale", "th_TH");
    if (seo.ogImage) {
      upsertMeta("property", "og:image", seo.ogImage);
      upsertMeta("name", "twitter:image", seo.ogImage);
    }
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", ogTitle);
    upsertMeta("name", "twitter:description", ogDescription);
    upsertCanonical(seo.canonical);
  }, [location]);

  return null;
}
