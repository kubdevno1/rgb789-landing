export interface RouteSeo {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export const CANONICAL_ORIGIN =
  typeof process !== "undefined" && process.env.CANONICAL_ORIGIN
    ? process.env.CANONICAL_ORIGIN.replace(/\/$/, "")
    : "https://rgb789.fun";

const LOGO_IMAGE = asset(
  "/images/legacy/rgb789-logo-full_e43066ad.jpg"
);
const SLOT_IMAGE = asset(
  "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp"
);
const PROMO_IMAGE = asset(
  "/images/legacy/promo-banner-4ghucn5AArY73W8K5B9gjq.webp"
);

function canonical(path: string) {
  return `${CANONICAL_ORIGIN}${path === "/" ? "/" : path}`;
}

function asset(path: string) {
  return `${CANONICAL_ORIGIN}${path}`;
}

export const ROUTE_SEO = {
  "/": {
    title: "RGB789 | ข้อมูลสล็อต คาสิโนสด และบริการออนไลน์",
    description:
      "เว็บไซต์ RGB789 รวมข้อมูลเกมสล็อต คาสิโนสด และช่องทางติดต่อบริการสำหรับผู้ใช้งานภาษาไทย",
    keywords:
      "RGB789, สล็อตออนไลน์, คาสิโนออนไลน์, เว็บพนันออนไลน์, บาคาร่าออนไลน์, สล็อตเว็บตรง, เว็บตรงไม่ผ่านเอเย่นต์, ฝากถอนไว, โบนัสสมาชิกใหม่, สมาชิกใหม่ฝาก100รับ200, คืนยอดเสีย, rgb789, สล็อตไม่มีขั้นต่ำ, เครดิตฟรี, แทงบอล",
    canonical: canonical("/"),
    ogImage: LOGO_IMAGE,
    ogImageAlt: "โลโก้ RGB789",
    ogType: "website",
  },
  "/demo-slot": {
    title: "ทดลองเล่นสล็อต | ข้อมูลเกมและโหมดทดลองเล่น RGB789",
    description:
      "ข้อมูลและโหมดทดลองเล่นสล็อตจาก RGB789 พร้อมรายละเอียดเกม ค่ายผู้ให้บริการ และคำแนะนำสำหรับผู้เริ่มต้น",
    keywords:
      "ทดลองเล่นสล็อต, สล็อตทดลองเล่น, สล็อตฟรี, ทดลองเล่นสล็อตฟรี, PG Soft ทดลอง, สล็อตไม่ต้องสมัคร, เล่นสล็อตฟรี, RGB789 ทดลอง",
    canonical: canonical("/demo-slot"),
    ogImage: SLOT_IMAGE,
    ogImageAlt: "ภาพรวมเกมทดลองเล่นสล็อต RGB789",
    ogType: "website",
  },
  "/free-credit": {
    title: "เครดิตฟรี RGB789 | รายละเอียดและเงื่อนไขโปรโมชั่น",
    description:
      "รวมรายละเอียดเครดิตฟรีและเงื่อนไขโปรโมชั่นของ RGB789 โปรดตรวจสอบข้อกำหนดล่าสุดก่อนเข้าร่วม",
    keywords:
      "เครดิตฟรี, เครดิตฟรีไม่ต้องฝาก, เครดิตฟรีไม่ต้องแชร์, รับเครดิตฟรี, สล็อตเครดิตฟรี, โบนัสฟรี, ฝาก100รับ200, RGB789 เครดิตฟรี",
    canonical: canonical("/free-credit"),
    ogTitle: "เครดิตฟรี RGB789 | รายละเอียดและเงื่อนไขโปรโมชั่น",
    ogDescription:
      "รวมรายละเอียดเครดิตฟรีและเงื่อนไขโปรโมชั่นของ RGB789 โปรดตรวจสอบข้อกำหนดล่าสุดก่อนเข้าร่วม",
    ogImage: PROMO_IMAGE,
    ogImageAlt: "ภาพประกอบโปรโมชั่น RGB789",
    ogType: "website",
  },
  "/slot789": {
    title: "สล็อต789 | เกมยอดนิยมและโหมดทดลองเล่น RGB789",
    description:
      "สล็อต789 ที่ RGB789 รวมเกมสล็อตออนไลน์ยอดนิยม พร้อมหน้าทดลองเล่นสล็อต โปรโมชั่นสมาชิกใหม่ และบริการผ่าน LINE ใช้งานสะดวกบนมือถือ",
    keywords:
      "สล็อต789, สล็อต 789, สล็อต789เว็บตรง, สล็อตเว็บตรง, สล็อตออนไลน์, สล็อตมือถือ, RGB789 สล็อต",
    canonical: canonical("/slot789"),
    ogTitle: "สล็อต789 | เกมยอดนิยมและโหมดทดลองเล่น RGB789",
    ogDescription: "สล็อต789 ที่ RGB789 รวมเกมสล็อตออนไลน์ยอดนิยม พร้อมหน้าทดลองเล่นสล็อต โปรโมชั่นสมาชิกใหม่ และบริการผ่าน LINE ใช้งานสะดวกบนมือถือ",
    ogImage: SLOT_IMAGE,
    ogImageAlt: "ภาพรวมเกมสล็อตยอดนิยม RGB789",
    ogType: "website",
  },
  "/promotions": {
    title: "โปรโมชั่น RGB789 | รายละเอียดและเงื่อนไขล่าสุด",
    description:
      "รวมรายการโปรโมชั่น RGB789 พร้อมรายละเอียดและเงื่อนไขของแต่ละรายการ โปรดตรวจสอบข้อมูลล่าสุดก่อนเข้าร่วม",
    keywords:
      "โปรโมชั่น RGB789, โบนัสสมาชิกใหม่, ฝาก100รับ200, เครดิตฟรี, คืนยอดเสีย, โปรโมชั่นสล็อต, โบนัสฟรี, สมาชิกใหม่รับโบนัส",
    canonical: canonical("/promotions"),
    ogImage: LOGO_IMAGE,
    ogImageAlt: "โลโก้ RGB789 สำหรับหน้ารวมโปรโมชั่น",
    ogType: "website",
  },
  "/articles": {
    title: "บทความ RGB789 | ความรู้สล็อต คาสิโนสด และการเดิมพันกีฬา",
    description:
      "รวมบทความและความรู้เกี่ยวกับสล็อต คาสิโนสด และการเดิมพันกีฬา พร้อมคำแนะนำสำหรับการอ่านข้อมูลอย่างรอบคอบ",
    keywords:
      "เทคนิคสล็อต, สูตรบาคาร่า, รีวิวสล็อต, PG Soft, คู่มือแทงบอล, คาสิโนสด, บทความสล็อต, RGB789 บทความ",
    canonical: canonical("/articles"),
    ogImage: LOGO_IMAGE,
    ogImageAlt: "โลโก้ RGB789 สำหรับหน้าบทความ",
    ogType: "website",
  },
} satisfies Record<string, RouteSeo>;

export const PRERENDER_ROUTES = [
  "/",
  "/demo-slot",
  "/free-credit",
  "/slot789",
  "/promotions",
  "/articles",
] as const;

export type PrerenderRoute = (typeof PRERENDER_ROUTES)[number];

export function getRouteSeo(pathname: string): RouteSeo | undefined {
  const normalized = decodeURIComponent(pathname.split("?", 1)[0] || "/");
  return ROUTE_SEO[normalized as keyof typeof ROUTE_SEO];
}

export const DEFAULT_ROUTE_SEO = ROUTE_SEO["/"];

export const SITE_NAME = "RGB789";
export const OG_LOCALE = "th_TH";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
