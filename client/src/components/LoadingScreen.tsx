import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number; // ms before auto-complete
}

export default function LoadingScreen({ onComplete, duration = 2800 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const startTime = Date.now();
    const totalDuration = duration - 400; // leave 400ms for fade-out

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        // Start fade-out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onComplete, 400);
        }, 100);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-24 z-[60] flex justify-center px-4 transition-all duration-400 ${
        fadeOut ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="กำลังเตรียมหน้าเว็บ"
    >
      <div
        className="flex w-full max-w-xs items-center gap-3 rounded-2xl px-4 py-3"
        style={{
          background: "linear-gradient(135deg, rgba(26,5,51,0.92), rgba(45,10,94,0.88))",
          border: "1px solid rgba(255,215,0,0.28)",
          boxShadow: "0 12px 30px rgba(15,2,37,0.35)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{
            background: "conic-gradient(from 0deg, #ffd700, #9333ea, #ffd700)",
            color: "#1a0533",
            animation: "spinRing 1.5s linear infinite",
          }}
        >
          R
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold tracking-wide text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>
              RGB789 กำลังเตรียมหน้าเว็บ
            </span>
            <span className="text-xs font-semibold" style={{ color: "#ffd700" }}>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.14)" }}>
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #9333ea, #ffd700)",
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS keyframes via style tag */}
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
