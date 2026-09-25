export interface RouteSeo {
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export const CANONICAL_ORIGIN =
  typeof process !== "undefined" && process.env.CANONICAL_ORIGIN
    ? process.env.CANONICAL_ORIGIN.replace(/\/$/, "")
    : "https://rgb789.fun";

const LOGO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo-full_e43066ad.jpg";
const SLOT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp";
const PROMO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/promo-banner-4ghucn5AArY73W8K5B9gjq.webp";

function canonical(path: string) {
  return `${CANONICAL_ORIGIN}${path === "/" ? "/" : path}`;
}

export const ROUTE_SEO = {
  "/": {
    title: "RGB789 | สล็อตออนไลน์ คาสิโนออนไลน์ เว็บตรง ฝากถอนไว 24 ชั่วโมง",
    description:
      "RGB789 เว็บพนันออนไลน์อันดับ 1 สล็อตออนไลน์ บาคาร่าออนไลน์ คาสิโนสด เว็บตรงไม่ผ่านเอเย่นต์ สมาชิกใหม่ฝาก100รับ200 คืนยอดเสีย 7% ฝากถอนออโต้ไว ปลอดภัย 100%",
    keywords:
      "RGB789, สล็อตออนไลน์, คาสิโนออนไลน์, เว็บพนันออนไลน์, บาคาร่าออนไลน์, สล็อตเว็บตรง, เว็บตรงไม่ผ่านเอเย่นต์, ฝากถอนไว, โบนัสสมาชิกใหม่, สมาชิกใหม่ฝาก100รับ200, คืนยอดเสีย, rgb789, สล็อตไม่มีขั้นต่ำ, เครดิตฟรี, แทงบอล",
    canonical: canonical("/"),
    ogImage: LOGO_IMAGE,
    ogType: "website",
  },
  "/demo-slot": {
    title: "ทดลองเล่นสล็อตฟรี | RGB789 สล็อตทดลองเล่น 1,000+ เกม ไม่ต้องสมัคร",
    description:
      "ทดลองเล่นสล็อตฟรีทุกค่ายดังที่ RGB789 PG Soft, Pragmatic Play, Joker Gaming ไม่ต้องสมัครสมาชิก ไม่ต้องฝากเงิน เล่นได้ทันที สล็อตทดลองเล่นไม่มีขั้นต่ำฟรีทุกวัน",
    keywords:
      "ทดลองเล่นสล็อต, สล็อตทดลองเล่น, สล็อตฟรี, ทดลองเล่นสล็อตฟรี, PG Soft ทดลอง, สล็อตไม่ต้องสมัคร, เล่นสล็อตฟรี, RGB789 ทดลอง",
    canonical: canonical("/demo-slot"),
    ogImage: SLOT_IMAGE,
    ogType: "website",
  },
  "/free-credit": {
    title: "เครดิตฟรี RGB789 | รับเครดิตฟรีไม่ต้องฝาก ไม่ต้องแชร์ 2025",
    description:
      "รับเครดิตฟรี RGB789 ไม่ต้องฝาก ไม่ต้องแชร์ สมาชิกใหม่ฝาก100รับ200 โปรวันเกิดรับ500บาท คืนยอดเสีย7%ทุกวัน สมัครฟรีใช้เวลา3นาที",
    keywords:
      "เครดิตฟรี, เครดิตฟรีไม่ต้องฝาก, เครดิตฟรีไม่ต้องแชร์, รับเครดิตฟรี, สล็อตเครดิตฟรี, โบนัสฟรี, ฝาก100รับ200, RGB789 เครดิตฟรี",
    canonical: canonical("/free-credit"),
    ogTitle: "เครดิตฟรี RGB789 | รับเครดิตฟรีไม่ต้องฝาก ไม่ต้องแชร์",
    ogDescription:
      "รับเครดิตฟรี RGB789 ไม่ต้องฝาก ไม่ต้องแชร์ สมาชิกใหม่ฝาก100รับ200 โปรวันเกิดรับ500บาท คืนยอดเสีย7%ทุกวัน",
    ogImage: PROMO_IMAGE,
    ogType: "website",
  },
  "/slot789": {
    title: "สล็อต789 | สล็อตเว็บตรง RGB789 เกมยอดนิยม สมัครง่ายผ่าน LINE",
    description:
      "สล็อต789 ที่ RGB789 รวมเกมสล็อตออนไลน์ยอดนิยม พร้อมหน้าทดลองเล่นสล็อต โปรโมชั่นสมาชิกใหม่ และบริการผ่าน LINE ใช้งานสะดวกบนมือถือ",
    keywords:
      "สล็อต789, สล็อต 789, สล็อต789เว็บตรง, สล็อตเว็บตรง, สล็อตออนไลน์, สล็อตมือถือ, RGB789 สล็อต",
    canonical: canonical("/slot789"),
    ogTitle: "สล็อต789 | สล็อตเว็บตรง RGB789 เกมยอดนิยม",
    ogDescription: "รวมข้อมูลสล็อต789 เกมยอดนิยม ทดลองเล่นสล็อต และโปรโมชั่นที่ RGB789",
    ogImage: SLOT_IMAGE,
    ogType: "website",
  },
  "/promotions": {
    title: "โปรโมชั่น RGB789 | โบนัสสมาชิกใหม่ ฝาก100รับ200 เครดิตฟรี คืนยอดเสีย 7%",
    description:
      "โปรโมชั่น RGB789 ล่าสุด สมาชิกใหม่ฝาก100รับ200 รับโบนัส 60% คืนยอดเสีย 7% ทุกวัน เครดิตฟรีไม่ต้องฝาก โปรโมชั่นฝากถอนออโต้ไว ไม่มีขั้นต่ำ อัปเดตทุกวัน",
    keywords:
      "โปรโมชั่น RGB789, โบนัสสมาชิกใหม่, ฝาก100รับ200, เครดิตฟรี, คืนยอดเสีย, โปรโมชั่นสล็อต, โบนัสฟรี, สมาชิกใหม่รับโบนัส",
    canonical: canonical("/promotions"),
    ogImage: LOGO_IMAGE,
    ogType: "website",
  },
  "/articles": {
    title: "บทความ RGB789 | เทคนิคสล็อต สูตรบาคาร่า แทงบอลออนไลน์ 2567",
    description:
      "รวมบทความความรู้ RGB789 เทคนิคเล่นสล็อตออนไลน์ สูตรบาคาร่า 2567 รีวิวค่ายสล็อต PG Soft คู่มือแทงบอลออนไลน์ คาสิโนสด อ่านฟรีไม่มีค่าใช้จ่าย",
    keywords:
      "เทคนิคสล็อต, สูตรบาคาร่า, รีวิวสล็อต, PG Soft, คู่มือแทงบอล, คาสิโนสด, บทความสล็อต, RGB789 บทความ",
    canonical: canonical("/articles"),
    ogImage: LOGO_IMAGE,
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
