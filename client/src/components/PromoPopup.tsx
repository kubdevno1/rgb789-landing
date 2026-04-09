import { useEffect, useState, useCallback, useRef } from "react";
import { SITE_INFO } from "@/lib/constants";

interface PromoPopupProps {
  onClose: () => void;
}

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR";

const PROMOS = [
  {
    img: `${CDN}/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%9D%E0%B8%B2%E0%B8%81100%E0%B8%A3%E0%B8%B1%E0%B8%9A200%E0%B8%9A%E0%B8%B2%E0%B8%97new_a63601a2.jpg`,
    alt: "สมาชิกใหม่ฝาก 100 รับ 200 บาท",
    shareText: "🎰 RGB789 สมาชิกใหม่ฝาก 100 รับ 200 บาท เฉพาะสล็อต! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9A%E0%B8%99%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%9460%25_cddafa58.jpg`,
    alt: "สมาชิกใหม่รับโบนัสสูงสุด 60%",
    shareText: "💰 RGB789 สมาชิกใหม่รับโบนัสสูงสุด 60%! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B8%84%E0%B8%B7%E0%B8%99%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%947%25_2887cc55.jpg`,
    alt: "คืนยอดเสียสูงสุด 3-7%",
    shareText: "💸 RGB789 คืนยอดเสียสูงสุด 3-7% ทุกวัน! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%9D%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B1%E0%B8%9A2%25_91b6124c.jpg`,
    alt: "ทุกยอดฝากรับ 2% ทุกวัน",
    shareText: "⚡ RGB789 ทุกยอดฝากรับ 2% ทุกวัน ยอดเล่น 1 เทิร์น! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B8%99%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B8%97%E0%B8%AD%E0%B8%995%25_0fe3958d.jpg`,
    alt: "สมาชิกขาประจำ นาทีทอง 5%",
    shareText: "⭐ RGB789 สมาชิกขาประจำ ฝากแรกของวัน รับนาทีทอง 5%! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B9%81%E0%B8%99%E0%B8%B0%E0%B8%99%E0%B8%B3%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%A10.7%25_47df4181.jpg`,
    alt: "แนะนำเพื่อน รับค่าคอม 0.7%",
    shareText: "👥 RGB789 แนะนำเพื่อน รับค่าคอม 0.7% ทุกยอดเดิมพัน! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%84%E0%B8%9E%E0%B9%88%E0%B8%9A%E0%B8%A3%E0%B8%A3%E0%B8%A5%E0%B8%B1%E0%B8%A2_3ec6704a.jpg`,
    alt: "โปรไพ่บรรลัย บาคาร่า เสือมังกร",
    shareText: "🃏 RGB789 โปรไพ่บรรลัย ผิดติดต่อกัน 7-10 ไม้ รับคืน 7-10 เท่า! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%B4%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95%E0%B8%9F%E0%B8%A3%E0%B8%B5500%E0%B8%9A%E0%B8%B2%E0%B8%97_eec5132d.jpg`,
    alt: "โปรวันเกิด รับเครดิตฟรี 500 บาท",
    shareText: "🎂 RGB789 โปรวันเกิด รับเครดิตฟรี 500 บาท! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%9B(1)_61623794.jpg`,
    alt: "โปรสเต็ป ตายตัวเดียว",
    shareText: "🎯 RGB789 โปรสเต็ป ตายตัวเดียว STEP 5-12 รับคืน 1-8 เท่า! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%9B_1258aee5.jpg`,
    alt: "โปรสเต็ป ตายหมด",
    shareText: "🎲 RGB789 โปรสเต็ป ตายหมด 7-10 คู่ รับสูงสุด 20,000 บาท! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B8%9D%E0%B8%B2%E0%B8%81300%E0%B8%AB%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%A5%E0%B9%89%E0%B8%AD_a150bdb0.jpg`,
    alt: "ฝาก 300 บาท หมุนกงล้อฟรี",
    shareText: "🎡 RGB789 ฝาก 300 บาท หมุนกงล้อฟรีทุกวัน ลุ้นรับทองคำ! สมัครเลย 👉",
  },
  {
    img: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%AA%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%B7%E0%B8%AD%E0%B8%99_2b271a32.jpg`,
    alt: "โปรสิ้นเดือน ทุกวันที่ 28-03 รับโบนัส 10%",
    shareText: "📅 RGB789 โปรสิ้นเดือน ทุกวันที่ 28-03 ฝากแรกของวัน รับโบนัส 10%! สมัครเลย 👉",
  },
];

const SHARE_URL = "https://rgb789.me";

export default function PromoPopup({ onClose }: PromoPopupProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * PROMOS.length));
  const [countdown, setCountdown] = useState(12);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const promo = PROMOS[currentIndex];

  // Slide-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Countdown timer
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { return 0; }
        return c - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 350);
  }, [onClose]);

  const handleCTA = useCallback(() => {
    window.open(SITE_INFO.registerUrl, "_blank", "noopener,noreferrer");
    handleClose();
  }, [handleClose]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + PROMOS.length) % PROMOS.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % PROMOS.length);
  }, []);

  // Share handlers
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
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareMessage;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [shareMessage]);

  const progressPct = (countdown / 12) * 100;

  const socialButtons = [
    {
      label: "LINE",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      ),
      bg: "#06C755",
      onClick: handleShareLine,
    },
    {
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      bg: "#1877F2",
      onClick: handleShareFacebook,
    },
    {
      label: "X",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      bg: "#000000",
      onClick: handleShareTwitter,
    },
    {
      label: copied ? "คัดลอกแล้ว!" : "คัดลอก",
      icon: copied ? (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
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
          background: "rgba(0,0,0,0.8)",
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
          width: "min(92vw, 400px)",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1a0533 0%, #2d0a5e 100%)",
            boxShadow: "0 0 60px rgba(124,58,237,0.6), 0 20px 60px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,215,0,0.35)",
          }}
        >
          {/* Gold shimmer top strip */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg, transparent, #ffd700, transparent)",
              backgroundSize: "200% auto",
              animation: "shimmerStrip 2s linear infinite",
            }}
          />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all z-20"
            style={{ fontSize: "16px" }}
            aria-label="ปิด"
          >
            ✕
          </button>

          <div className="px-4 pt-5 pb-4 flex flex-col gap-3">
            {/* Image area with prev/next arrows */}
            <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img
                key={currentIndex}
                src={promo.img}
                alt={promo.alt}
                className="w-full h-full object-cover"
                style={{ animation: "fadeInImg 0.3s ease" }}
                loading="eager"
              />

              {/* Prev arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  cursor: "pointer",
                }}
                aria-label="ก่อนหน้า"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Next arrow */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  cursor: "pointer",
                }}
                aria-label="ถัดไป"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Index badge */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  color: "#ffd700",
                  fontFamily: "'Kanit', sans-serif",
                  backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,215,0,0.3)",
                }}
              >
                {currentIndex + 1} / {PROMOS.length}
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 flex-wrap">
              {PROMOS.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentIndex ? "20px" : "8px",
                    height: "8px",
                    background: i === currentIndex ? "#ffd700" : "rgba(255,255,255,0.3)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={`โปรโมชั่น ${i + 1}`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCTA}
              className="w-full py-3.5 rounded-xl font-black text-lg relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 50%, #ffd700 100%)",
                backgroundSize: "200% auto",
                color: "#1a0533",
                fontFamily: "'Kanit', sans-serif",
                boxShadow: "0 4px 20px rgba(255,215,0,0.5)",
                animation: "shimmerBtn 2s linear infinite, pulseBtn 1.5s ease-in-out infinite",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              🎰 สมัครสมาชิก / รับโปรโมชั่น
            </button>

            {/* Share section */}
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Kanit', sans-serif" }}>
                  แชร์โปรโมชั่นให้เพื่อน
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {socialButtons.map((btn) => (
                  <button
                    key={btn.label}
                    onClick={(e) => { e.stopPropagation(); btn.onClick(); }}
                    className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl transition-all active:scale-95 hover:brightness-110"
                    style={{
                      background: btn.bg,
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                      cursor: "pointer",
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
              <div className="w-full rounded-full overflow-hidden" style={{ height: "3px", background: "rgba(255,255,255,0.12)" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${progressPct}%`,
                    background: countdown > 5 ? "rgba(255,215,0,0.7)" : "rgba(255,80,80,0.8)",
                  }}
                />
              </div>
              <p className="text-white/35 text-xs mt-1 text-center" style={{ fontFamily: "'Kanit', sans-serif" }}>
                {countdown > 0 ? `ปิดอัตโนมัติใน ${countdown} วินาที` : "แตะที่ใดก็ได้เพื่อปิด"}
              </p>
            </div>
          </div>

          {/* Bottom glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,215,0,0.1) 0%, transparent 70%)" }}
          />
        </div>

        <style>{`
          @keyframes shimmerStrip {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes shimmerBtn {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          @keyframes pulseBtn {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes fadeInImg {
            from { opacity: 0; transform: scale(1.04); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </>
  );
}
