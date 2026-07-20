// Design: Electric Stadium — Promotions Page
// แสดงภาพโปรโมชั่นทั้งหมดแบบ grid พร้อมรายละเอียด

import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, X } from "lucide-react";
import { SITE_INFO } from "@/lib/constants";
import { useSEO } from "@/hooks/useSEO";
import StickyPromoBar from "@/components/StickyPromoBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import BottomNavBar from "@/components/BottomNavBar";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR";

const PROMOTIONS = [
  {
    id: 1,
    title: "สมาชิกใหม่ ฝาก 100 รับ 200 บาท",
    subtitle: "เฉพาะสล็อต",
    badge: "ยอดนิยม",
    badgeColor: "#FFD700",
    image: `${CDN}/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%9D%E0%B8%B2%E0%B8%81100%E0%B8%A3%E0%B8%B1%E0%B8%9A200%E0%B8%9A%E0%B8%B2%E0%B8%97new_a63601a2.jpg`,
    detail: "สมาชิกใหม่ฝากครั้งแรก 100 บาท รับโบนัสทันที 200 บาท เฉพาะเกมสล็อต ต้องมียอดเล่น 5 เทิร์น ถอนได้สูงสุด 1,000 บาท",
  },
  {
    id: 2,
    title: "สมาชิกใหม่ รับโบนัสสูงสุด 60%",
    subtitle: "ฝากครั้งแรก",
    badge: "ใหม่",
    badgeColor: "#a855f7",
    image: `${CDN}/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9A%E0%B8%99%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%9460%25_cddafa58.jpg`,
    detail: "สมาชิกใหม่รับโบนัสสูงสุด 60% จากยอดฝากครั้งแรก ไม่จำกัดประเภทเกม ต้องมียอดเล่น 3 เทิร์น",
  },
  {
    id: 3,
    title: "คืนยอดเสียสูงสุด 3-7%",
    subtitle: "ทุกวัน ไม่มีขั้นต่ำ",
    badge: "ประจำวัน",
    badgeColor: "#10b981",
    image: `${CDN}/%E0%B8%84%E0%B8%B7%E0%B8%99%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%947%25_2887cc55.jpg`,
    detail: "รับเงินคืนจากยอดเสียสูงสุด 3-7% ทุกวัน ไม่มีขั้นต่ำ โอนเข้าอัตโนมัติทุกวันเวลา 00:00 น.",
  },
  {
    id: 4,
    title: "ทุกยอดฝากรับ 2% ทุกวัน",
    subtitle: "ยอดเล่น 1 เทิร์น ถอนได้เลย",
    badge: "ทุกวัน",
    badgeColor: "#3b82f6",
    image: `${CDN}/%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B1%E0%B8%9A2%25_91b6124c.jpg`,
    detail: "ฝากทุกครั้งรับโบนัส 2% ทันที ต้องมียอดเล่น 1 เทิร์นเท่านั้น ถอนได้ทันที ไม่จำกัดจำนวนครั้ง",
  },
  {
    id: 5,
    title: "สมาชิกขาประจำ นาทีทอง 5%",
    subtitle: "ฝากแรกของวัน",
    badge: "VIP",
    badgeColor: "#f59e0b",
    image: `${CDN}/%E0%B8%99%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B8%97%E0%B8%AD%E0%B8%995%25_0fe3958d.jpg`,
    detail: "สมาชิกขาประจำรับโบนัส 5% จากยอดฝากแรกของวัน ต้องมียอดเล่น 1 เทิร์น สามารถถอนได้เลย",
  },
  {
    id: 6,
    title: "แนะนำเพื่อน รับค่าคอม 0.7%",
    subtitle: "ทุกยอดเดิมพันของเพื่อน",
    badge: "ตลอดชีพ",
    badgeColor: "#ec4899",
    image: `${CDN}/%E0%B9%81%E0%B8%99%E0%B8%B0%E0%B8%99%E0%B8%B3%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%A10.7%25_47df4181.jpg`,
    detail: "แนะนำเพื่อนมาสมัครสมาชิก รับค่าคอมมิชชั่น 0.7% จากทุกยอดเดิมพันของเพื่อน ตลอดชีพ ไม่มีวันหมดอายุ",
  },
  {
    id: 7,
    title: "โปรไพ่บรรลัย",
    subtitle: "บาคาร่า เสือมังกร",
    badge: "พิเศษ",
    badgeColor: "#ef4444",
    image: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9E%E0%B9%88%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%A5%E0%B8%B1%E0%B8%A2_3ec6704a.jpg`,
    detail: "ผิดติดต่อกัน 7 ไม้ รับคืน 7 เท่า | 8 ไม้ รับคืน 8 เท่า | 9 ไม้ รับคืน 9 เท่า | 10 ไม้ รับคืน 10 เท่า",
  },
  {
    id: 8,
    title: "โปรวันเกิด",
    subtitle: "รับเครดิตฟรี 500 บาท",
    badge: "วันเกิด",
    badgeColor: "#8b5cf6",
    image: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%B4%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95%E0%B8%9F%E0%B8%A3%E0%B8%B5500%E0%B8%9A%E0%B8%B2%E0%B8%97_eec5132d.jpg`,
    detail: "รับเครดิตฟรี 500 บาท ในวันเกิดของคุณ แจ้งแอดมินผ่าน LINE พร้อมแนบสำเนาบัตรประชาชน",
  },
  {
    id: 9,
    title: "โปรสเต็ป ตายตัวเดียว",
    subtitle: "STEP 5-12 รับคืน 1-8 เท่า",
    badge: "สเต็ป",
    badgeColor: "#06b6d4",
    image: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%9B(1)_61623794.jpg`,
    detail: "ตายตัวเดียว STEP 5 รับคืน 1 เท่า | STEP 6 รับคืน 2 เท่า | STEP 7 รับคืน 3 เท่า จนถึง STEP 12 รับคืน 8 เท่า",
  },
  {
    id: 10,
    title: "โปรสเต็ป ตายหมด",
    subtitle: "ตายหมด 7-10 คู่ รับ 5,000-20,000 บาท",
    badge: "สเต็ป",
    badgeColor: "#06b6d4",
    image: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%9B_1258aee5.jpg`,
    detail: "ตายหมด 7 คู่ รับ 5,000 บาท | ตายหมด 8 คู่ รับ 10,000 บาท | ตายหมด 9 คู่ รับ 15,000 บาท | ตายหมด 10 คู่ รับ 20,000 บาท",
  },
  {
    id: 11,
    title: "ฝาก 300 บาท หมุนกงล้อฟรี",
    subtitle: "รับได้ทุกวัน ลุ้นรับทองคำ",
    badge: "ทุกวัน",
    badgeColor: "#10b981",
    image: `${CDN}/%E0%B8%9D%E0%B8%B2%E0%B8%81300%E0%B8%AB%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%A5%E0%B9%89%E0%B8%AD_a150bdb0.jpg`,
    detail: "ฝากเงิน 300 บาทขึ้นไป รับสิทธิ์หมุนกงล้อฟรี 1 ครั้งต่อวัน ลุ้นรับรางวัลสูงสุดทองคำ 1 บาท",
  },
  {
    id: 12,
    title: "โปรสิ้นเดือน",
    subtitle: "ทุกวันที่ 28-03 รับโบนัส 10%",
    badge: "สิ้นเดือน",
    badgeColor: "#f97316",
    image: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%B7%E0%B8%AD%E0%B8%99_2b271a32.jpg`,
    detail: "ทุกวันที่ 28-03 ของทุกเดือน รับโบนัสเพิ่ม 10% จากยอดฝากแรกของวัน เฉพาะสมาชิกที่มียอดเล่นในเดือนนั้น",
  },
];

export default function Promotions() {
  const [selectedPromo, setSelectedPromo] = useState<typeof PROMOTIONS[0] | null>(null);

  useSEO({
    title: "โปรโมชั่น RGB789 | โบนัสสมาชิกใหม่ ฝาก100รับ200 เครดิตฟรี คืนยอดเสีย 7%",
    description: "โปรโมชั่น RGB789 ล่าสุด สมาชิกใหม่ฝาก100รับ200 รับโบนัส 60% คืนยอดเสีย 7% ทุกวัน เครดิตฟรีไม่ต้องฝาก โปรโมชั่นฝากถอนออโต้ไว ไม่มีขั้นต่ำ อัปเดตทุกวัน",
    keywords: "โปรโมชั่น RGB789, โบนัสสมาชิกใหม่, ฝาก100รับ200, เครดิตฟรี, คืนยอดเสีย, โปรโมชั่นสล็อต, โบนัสฟรี, สมาชิกใหม่รับโบนัส",
    canonical: "https://rgb789.me/promotions",
    ogType: "website",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo-full_e43066ad.jpg",
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0225 0%, #1a0533 10%, #0f0225 100%)" }}
    >
      <StickyPromoBar />

      {/* Header */}
      <div
        className="fixed left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{
          top: "36px",
          background: "linear-gradient(90deg, rgba(15,2,37,0.95) 0%, rgba(45,10,78,0.9) 50%, rgba(15,2,37,0.95) 100%)",
          borderColor: "rgba(139,92,246,0.2)",
        }}
      >
        <div className="container flex items-center gap-4 h-16">
          <Link href="/">
            <button
              className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <ArrowLeft size={20} />
              <span className="text-sm">กลับหน้าหลัก</span>
            </button>
          </Link>
          <h1
            className="text-xl font-bold"
            style={{
              fontFamily: "'Kanit', sans-serif",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            โปรโมชั่นทั้งหมด
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container pt-36 pb-16">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Kanit', sans-serif",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            โปรโมชั่นพิเศษ RGB789
          </h2>
          <p
            className="text-white/60 text-base"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            โปรโมชั่นครบทุกรูปแบบ อัปเดตตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="rounded-xl overflow-hidden cursor-pointer group transition-all hover:scale-105 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.08) 100%)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              onClick={() => setSelectedPromo(promo)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  loading="lazy"
                />
                {/* Badge */}
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: promo.badgeColor,
                    color: "#1a0533",
                    fontFamily: "'Kanit', sans-serif",
                    fontSize: "10px",
                    boxShadow: `0 2px 8px ${promo.badgeColor}60`,
                  }}
                >
                  {promo.badge}
                </div>
              </div>

              {/* Info */}
              <div className="px-3 py-2.5">
                <p
                  className="text-white font-semibold text-xs leading-snug mb-0.5"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {promo.title}
                </p>
                <p
                  className="text-white/50 text-xs"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {promo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={SITE_INFO.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{
              fontFamily: "'Kanit', sans-serif",
              background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
              color: "#1a0533",
              boxShadow: "0 0 30px rgba(255,215,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            สมัครสมาชิกรับโปรโมชั่นเลย
          </a>
          <p
            className="mt-3 text-white/40 text-sm"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            สมัครฟรี ใช้เวลาเพียง 3 นาที
          </p>
        </div>
      </main>

      <LineFloatingButton />
      <BottomNavBar />

      {/* Detail Modal */}
      {selectedPromo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedPromo(null)}
        >
          <div
            className="relative max-w-sm w-full rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a0533 0%, #2d0a4e 100%)",
              border: "1px solid rgba(139,92,246,0.4)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPromo(null)}
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <img
              src={selectedPromo.image}
              alt={selectedPromo.title}
              className="w-full"
              style={{ aspectRatio: "1/1", objectFit: "cover" }}
            />

            {/* Content */}
            <div className="p-5">
              <div
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2"
                style={{
                  background: selectedPromo.badgeColor,
                  color: "#1a0533",
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                {selectedPromo.badge}
              </div>
              <h3
                className="text-white font-bold text-lg mb-1"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {selectedPromo.title}
              </h3>
              <p
                className="text-yellow-400 text-sm mb-3"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {selectedPromo.subtitle}
              </p>
              <p
                className="text-white/70 text-sm leading-relaxed mb-5"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {selectedPromo.detail}
              </p>
              <a
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-base transition-all hover:scale-105"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                  color: "#1a0533",
                  boxShadow: "0 0 20px rgba(255,215,0,0.3)",
                }}
              >
                รับโปรโมชั่นนี้เลย
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
