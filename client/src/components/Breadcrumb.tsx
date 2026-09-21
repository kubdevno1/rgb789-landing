// Breadcrumb component — SEO-optimized with JSON-LD BreadcrumbList schema
// ใช้งาน: <Breadcrumb items={[{ label: "หน้าหลัก", href: "/" }, { label: "ทดลองเล่นสล็อต" }]} />

import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { useEffect } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string; // ถ้าไม่มี href = หน้าปัจจุบัน (ไม่ clickable)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

const BASE_URL = "https://rgb789.me";

export default function Breadcrumb({ items, baseUrl = BASE_URL }: BreadcrumbProps) {
  const itemSignature = JSON.stringify(items);

  // Inject JSON-LD BreadcrumbList schema
  useEffect(() => {
    const schemaId = "breadcrumb-schema";
    // Remove existing schema if any
    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    const allItems = [{ label: "หน้าหลัก", href: "/" }, ...items.filter((i) => i.label !== "หน้าหลัก")];

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: allItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: item.href ? `${baseUrl}${item.href}` : undefined,
      })),
    };

    const script = document.createElement("script");
    script.id = schemaId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [itemSignature, baseUrl]);

  const allItems: BreadcrumbItem[] = [{ label: "หน้าหลัก", href: "/" }, ...items.filter((i) => i.label !== "หน้าหลัก")];

  return (
    <nav aria-label="breadcrumb" className="w-full">
      <ol
        className="flex flex-wrap items-center gap-1 text-sm"
        style={{ fontFamily: "'Kanit', sans-serif" }}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li
              key={index}
              className="flex items-center gap-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {/* Separator */}
              {index > 0 && (
                <ChevronRight
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                />
              )}

              {/* Home icon for first item */}
              {index === 0 && (
                <Home size={13} className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
              )}

              {isLast || !item.href ? (
                // Current page — not clickable
                <span
                  itemProp="name"
                  aria-current="page"
                  style={{ color: "#FFD700" }}
                >
                  {item.label}
                </span>
              ) : (
                // Clickable link
                <Link href={item.href}>
                  <span
                    itemProp="name"
                    className="transition-colors hover:text-yellow-300 cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item.label}
                  </span>
                  <meta itemProp="item" content={`${baseUrl}${item.href}`} />
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
