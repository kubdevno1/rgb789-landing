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
    shareText: "🎰 RGB789 แจกโบนัส 100% ฝากครั้งแรก! ฝาก 100 รับ 200 บาท สูงสุด 5,000 บาท สมัครเลย 👉",
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
    shareText: "💸 RGB789 คืนยอดเสีย 10% ทุกวัน ไม่มีขั้นต่ำ ไม่ต้องทำเทิร์น! สมัครเลย 👉",
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
    shareText: "⚡ RGB789 ฝากทุกยอดรับ 2% ทุกวัน ไม่จำกัดครั้ง รองรับทุกธนาคาร! สมัครเลย 👉",
    cta: "ฝากเงินรับโบนัส",
    color1: "#0f766e",
    color2: "#7c3aed",
    accent: "#ffd700",
  },
];

// Share URL — use the deployed domain
const SHARE_URL = "https://rgb789.me";

export default function PromoPopup({ onClose }: PromoPopupProps) {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [promoIndex] = useState(() => Math.floor(Math.random() * PROMOS.length));
  const [closing, setClosing] = useState(false);
  const [copied, setCopied] = useState(false);

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
        if (c <= 1) { clearInterval(t); return 0; }
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

  // ── Share handlers ──────────────────────────────────────────────
  const shareMessage = `${promo.shareText} ${SHARE_URL}`;

  const handleShareLine = useCallback(() => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(promo.shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  }, [promo.shareText]);

  const handleShareFacebook = useCallback(() => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(promo.shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
  }, [promo.shareText]);

  const handleShareTwitter = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
  }, [shareMessage]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = shareMessage;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [shareMessage]);

  // Progress bar width for countdown
  const progressPct = (countdown / 10) * 100;

  // Social button config
  const socialButtons = [
    {
      label: "LINE",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      bg: "#06C755",
      onClick: handleShareLine,
    },
    {
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bg: "#1877F2",
      onClick: handleShareFacebook,
    },
    {
      label: "X",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bg: "#000000",
      onClick: handleShareTwitter,
    },
    {
      label: copied ? "คัดลอกแล้ว!" : "คัดลอก",
      icon: copied ? (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      ),
      bg: copied ? "#16a34a" : "#4b5563",
      onClick: handleCopyLink,
    },
  ];

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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
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
              backgroundSize: "200% auto",
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
                  filter: "drop-shadow(0 2px 8px rgba(255,215,0,0.4))",
                }}
              >
                {promo.headline}
              </h2>
              <p className="text-white font-semibold text-lg mt-1" style={{ fontFamily: "'Kanit', sans-serif" }}>
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
              <p className="font-bold text-lg mt-0.5" style={{ color: promo.accent, fontFamily: "'Kanit', sans-serif" }}>
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
              🎰 {promo.cta}
            </button>

            {/* ── Share section ── */}
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Kanit', sans-serif" }}>
                  แชร์โปรโมชั่นให้เพื่อน
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {socialButtons.map((btn) => (
                  <button
                    key={btn.label}
                    onClick={(e) => { e.stopPropagation(); btn.onClick(); }}
                    className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl transition-all active:scale-95 hover:brightness-110"
                    style={{
                      background: btn.bg,
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#fff",
                      cursor: "pointer",
                      transition: "transform 0.15s, filter 0.15s",
                    }}
                    title={`แชร์ผ่าน ${btn.label}`}
                  >
                    {btn.icon}
                    <span style={{ fontSize: "10px", fontFamily: "'Kanit', sans-serif", lineHeight: 1 }}>
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

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
                    background: countdown > 5 ? "rgba(255,215,0,0.7)" : "rgba(255,80,80,0.8)",
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
            style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(255,215,0,0.15) 0%, transparent 70%)` }}
          />

          {/* Floating coins */}
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
