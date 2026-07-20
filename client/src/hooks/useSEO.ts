/**
 * useSEO — hook สำหรับจัดการ SEO metadata แบบ dynamic ต่อหน้า
 * ใช้ document.head manipulation โดยตรง (ไม่ต้องติดตั้ง react-helmet)
 */
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  noIndex = false,
}: SEOProps) {
  useEffect(() => {
    // --- Title ---
    document.title = title;

    // --- Helper: upsert meta tag ---
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.startsWith('[property')
          ? "property"
          : selector.startsWith('[name')
          ? "name"
          : "name";
        const val = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // --- Helper: upsert link tag ---
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // Standard meta
    setMeta('[name="description"]', description);
    if (keywords) setMeta('[name="keywords"]', keywords);
    setMeta('[name="robots"]', noIndex ? "noindex, nofollow" : "index, follow");

    // Open Graph
    setMeta('[property="og:title"]', ogTitle ?? title);
    setMeta('[property="og:description"]', ogDescription ?? description);
    setMeta('[property="og:type"]', ogType);
    if (ogImage) setMeta('[property="og:image"]', ogImage);
    if (canonical) {
      setMeta('[property="og:url"]', canonical);
      setLink("canonical", canonical);
    }

    // Twitter Card
    setMeta('[name="twitter:title"]', ogTitle ?? title);
    setMeta('[name="twitter:description"]', ogDescription ?? description);
    if (ogImage) setMeta('[name="twitter:image"]', ogImage);

    // Cleanup: restore default title on unmount
    return () => {
      document.title = "RGB789 | สล็อตออนไลน์ คาสิโนออนไลน์ เว็บตรง ฝากถอนไว 24 ชั่วโมง";
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, noIndex]);
}
