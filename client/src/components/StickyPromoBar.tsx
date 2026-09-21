// Design: Electric Stadium — Sticky Promo Bar
// แถบโปรโมชั่นด้านบนสุดของหน้าเว็บ พร้อม marquee text และปุ่ม CTA

import { useState, useCallback } from "react";
import { SITE_INFO } from "@/lib/constants";
import { trackRegisterClick } from "@/lib/analytics";
import { X } from "lucide-react";

const PROMO_MESSAGES = [
  "🎰 สมาชิกใหม่ฝาก 100 รับ 200 บาท เฉพาะสล็อต",
  "💰 คืนยอดเสียสูงสุด 3-7% ทุกวัน",
  "⚡ ทุกยอดฝากรับ 2% ทุกวัน ยอดเล่น 1 เทิร์น",
  "⭐ สมาชิกขาประจำ ฝากแรกของวัน รับนาทีทอง 5%",
  "👥 แนะนำเพื่อน รับค่าคอม 0.7% ทุกยอดเดิมพัน",
  "🎂 โปรวันเกิด รับเครดิตฟรี 500 บาท",
  "🎡 ฝาก 300 บาท หมุนกงล้อฟรีทุกวัน ลุ้นรับทองคำ",
  "📅 โปรสิ้นเดือน ทุกวันที่ 28-03 รับโบนัส 10%",
  "🃏 โปรไพ่บรรลัย ผิดติดต่อกัน 7-10 ไม้ รับคืน 7-10 เท่า",
];

export default function StickyPromoBar() {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  if (dismissed) return null;

  // Build marquee text by joining all messages
  const marqueeText = PROMO_MESSAGES.join("   ✦   ");

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] flex items-center"
      style={{
        background: "linear-gradient(90deg, #3b0764 0%, #6d28d9 40%, #fbbf24 60%, #f59e0b 80%, #3b0764 100%)",
        backgroundSize: "200% auto",
        animation: "shimmerBar 4s linear infinite",
        height: "36px",
        minHeight: "36px",
      }}
    >
      {/* Marquee container */}
      <div className="flex-1 overflow-hidden relative" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 5%, black 90%, transparent 100%)" }}>
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: "marqueeScroll 30s linear infinite",
            gap: "0",
          }}
        >
          {/* Duplicate for seamless loop */}
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="inline-flex items-center gap-6 pr-16"
              style={{
                fontFamily: "'Kanit', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#fff",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                letterSpacing: "0.3px",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={SITE_INFO.registerUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackRegisterClick("sticky-promo-bar", "สมัครเลย")}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 mr-2 rounded-md font-bold text-xs transition-all hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #ffd700 0%, #f59e0b 100%)",
          color: "#1a0533",
          fontFamily: "'Kanit', sans-serif",
          boxShadow: "0 2px 8px rgba(255,215,0,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        สมัครเลย
      </a>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 flex items-center justify-center w-7 h-7 mr-1 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
        aria-label="ปิดแถบโปรโมชั่น"
      >
        <X size={14} />
      </button>

      {/* Inline keyframes */}
      <style>{`
        @keyframes shimmerBar {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
