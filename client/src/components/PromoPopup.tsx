import { useEffect, useState, useCallback } from "react";
import { SITE_INFO } from "@/lib/constants";

interface PromoPopupProps {
  onClose: () => void;
}

const PROMOS = [
  {
    badge: "🎁 ต้อนรับสมาชิกใหม่",
    headline: "โบนัส 100%",
    subheadline: "ฝากครั้งแรก รับทันที!",
    detail: "ฝาก 100 รับ 200 บาท",
    highlight: "สูงสุด 5,000 บาท",
    cta: "รับโบนัสเลย",
    color1: "#7c3aed",
    color2: "#4c1d95",
    accent: "#ffd700",
  },
  {
    badge: "💸 คืนยอดเสียทุกวัน",
    headline: "คืน 10%",
    subheadline: "ยอดเสียทุกวัน ไม่มีขั้นต่ำ!",
    detail: "รับเงินคืนอัตโนมัติทุกวัน",
    highlight: "ไม่ต้องทำเทิร์น",
    cta: "สมัครรับสิทธิ์",
    color1: "#be185d",
    color2: "#7c3aed",
    accent: "#ffd700",
  },
  {
    badge: "⚡ ฝากทุกยอด",
    headline: "รับ 2% ทุกวัน",
    subheadline: "ฝากเงินทุกครั้ง รับโบนัสทันที!",
    detail: "ไม่จำกัดจำนวนครั้ง",
    highlight: "ทุกธนาคาร & TrueMoney",
    cta: "ฝากเงินรับโบนัส",
    color1: "#0f766e",
    color2: "#7c3aed",
    accent: "#ffd700",
  },
];

export default function PromoPopup({ onClose }: PromoPopupProps) {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [promoIndex] = useState(() => Math.floor(Math.random() * PROMOS.length));
  const [closing, setClosing] = useState(false);

  const promo = PROMOS[promoIndex];

  // Slide-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 350);
  }, [onClose]);

  const handleCTA = useCallback(() => {
    window.location.href = SITE_INFO.registerUrl;
    handleClose();
  }, [handleClose]);

  // Progress bar width for countdown
  const progressPct = (countdown / 10) * 100;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(4px)",
          opacity: visible && !closing ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
        onClick={handleClose}
      />

      {/* Popup card */}
      <div
        className="fixed z-[9999] left-1/2"
        style={{
          top: "50%",
          transform: `translate(-50%, -50%) scale(${visible && !closing ? 1 : 0.85})`,
          opacity: visible && !closing ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease",
          width: "min(92vw, 420px)",
        }}
      >
        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${promo.color1} 0%, ${promo.color2} 100%)`,
            boxShadow: `0 0 60px rgba(124,58,237,0.6), 0 20px 60px rgba(0,0,0,0.5)`,
            border: "1px solid rgba(255,215,0,0.3)",
          }}
        >
          {/* Top sparkle strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${promo.accent}, transparent)`,
              animation: "shimmerStrip 2s linear infinite",
            }}
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
            style={{ fontSize: "18px", lineHeight: 1 }}
            aria-label="ปิด"
          >
            ✕
          </button>

          {/* Content */}
          <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center gap-3">
            {/* Badge */}
            <div
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(255,215,0,0.15)",
                border: "1px solid rgba(255,215,0,0.5)",
                color: promo.accent,
                fontFamily: "'Kanit', sans-serif",
                animation: "pulseBadge 2s ease-in-out infinite",
              }}
            >
              {promo.badge}
            </div>

            {/* Headline */}
            <div>
              <h2
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(3rem, 14vw, 5rem)",
                  background: `linear-gradient(135deg, ${promo.accent} 0%, #fff8dc 50%, ${promo.accent} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shimmerText 2s linear infinite",
                  fontFamily: "'Kanit', sans-serif",
                  textShadow: "none",
                  filter: "drop-shadow(0 2px 8px rgba(255,215,0,0.4))",
                }}
              >
                {promo.headline}
              </h2>
              <p
                className="text-white font-semibold text-lg mt-1"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {promo.subheadline}
              </p>
            </div>

            {/* Detail box */}
            <div
              className="w-full rounded-xl px-4 py-3"
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,215,0,0.2)",
              }}
            >
              <p className="text-white/90 text-base" style={{ fontFamily: "'Kanit', sans-serif" }}>
                {promo.detail}
              </p>
              <p
                className="font-bold text-lg mt-0.5"
                style={{ color: promo.accent, fontFamily: "'Kanit', sans-serif" }}
              >
                {promo.highlight}
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCTA}
              className="w-full py-4 rounded-xl font-black text-xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${promo.accent} 0%, #ffaa00 50%, ${promo.accent} 100%)`,
                backgroundSize: "200% auto",
                color: "#1a0533",
                fontFamily: "'Kanit', sans-serif",
                boxShadow: `0 4px 20px rgba(255,215,0,0.5)`,
                animation: "shimmerBtn 2s linear infinite, pulseBtn 1.5s ease-in-out infinite",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              <span className="relative z-10">🎰 {promo.cta}</span>
            </button>

            {/* Countdown bar */}
            <div className="w-full">
              <div
                className="w-full rounded-full overflow-hidden"
                style={{ height: "3px", background: "rgba(255,255,255,0.15)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${progressPct}%`,
                    background: countdown > 5
                      ? "rgba(255,215,0,0.7)"
                      : "rgba(255,80,80,0.8)",
                  }}
                />
              </div>
              <p
                className="text-white/40 text-xs mt-1.5 text-center"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {countdown > 0 ? `ปิดอัตโนมัติใน ${countdown} วินาที` : "แตะที่ใดก็ได้เพื่อปิด"}
              </p>
            </div>
          </div>

          {/* Bottom glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, rgba(255,215,0,0.15) 0%, transparent 70%)`,
            }}
          />

          {/* Floating coins decoration */}
          {["💰", "🪙", "💎"].map((coin, i) => (
            <span
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                fontSize: "1.5rem",
                left: `${15 + i * 30}%`,
                top: `${10 + (i % 2) * 15}%`,
                animation: `floatCoin ${2 + i * 0.4}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.4,
              }}
            >
              {coin}
            </span>
          ))}
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes shimmerStrip {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes shimmerText {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes shimmerBtn {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulseBadge {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255,215,0,0.3); }
            50% { box-shadow: 0 0 0 6px rgba(255,215,0,0); }
          }
          @keyframes pulseBtn {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes floatCoin {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(15deg); }
          }
        `}</style>
      </div>
    </>
  );
}
