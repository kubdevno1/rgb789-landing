import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number; // ms before auto-complete
}

export default function LoadingScreen({ onComplete, duration = 1800 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setProgress(100);
      const completeTimer = window.setTimeout(onComplete, 120);
      return () => window.clearTimeout(completeTimer);
    }

    // Animate progress bar without hiding the route content underneath.
    const startTime = Date.now();
    const totalDuration = Math.max(duration - 360, 300);
    let finishTimer: number | undefined;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        finishTimer = window.setTimeout(onComplete, 360);
      }
    }, 32);

    return () => {
      clearInterval(interval);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-24 z-[60] flex justify-center px-4 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
        fadeOut ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="กำลังเตรียมหน้าเว็บ"
    >
      <div
        className="flex w-full max-w-xs items-center gap-3 rounded-2xl px-4 py-3 animate-[loadingPanelIn_280ms_ease-out] motion-reduce:animate-none"
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
            animation: "spinRing 1.2s linear infinite",
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
              className="h-full rounded-full transition-[width] duration-150 ease-out motion-reduce:transition-none"
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
        @keyframes loadingPanelIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
