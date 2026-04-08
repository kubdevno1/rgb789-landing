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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #0a0118 0%, #1a0533 40%, #0f0225 70%, #0a0118 100%)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0
                ? "rgba(255, 215, 0, 0.6)"
                : i % 3 === 1
                ? "rgba(180, 100, 255, 0.6)"
                : "rgba(255, 255, 255, 0.3)",
              animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "320px",
          height: "320px",
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)",
          animation: "pulseGlow 2s ease-in-out infinite",
        }}
      />

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo circle with spinning border */}
        <div className="relative">
          {/* Spinning gradient ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              padding: "3px",
              background: "conic-gradient(from 0deg, #ffd700, #9333ea, #ffd700, #9333ea, #ffd700)",
              animation: "spinRing 2s linear infinite",
              borderRadius: "50%",
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ background: "#1a0533" }}
            />
          </div>

          {/* Logo image */}
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: "120px",
              height: "120px",
              background: "linear-gradient(135deg, #2d0a5e 0%, #4a1a8a 50%, #2d0a5e 100%)",
              boxShadow: "0 0 40px rgba(147, 51, 234, 0.5), 0 0 80px rgba(147, 51, 234, 0.2)",
            }}
          >
            <img
              src="https://cdn.manus.im/webdev-static/VGyYopoy4jPaukwiBaCcsR/rgb789-logo.png"
              alt="RGB789"
              className="w-20 h-20 object-contain"
              onError={(e) => {
                // Fallback to text if image fails
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Fallback text logo */}
            <span
              className="absolute font-bold text-2xl"
              style={{
                background: "linear-gradient(135deg, #ffd700, #ffaa00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Kanit', sans-serif",
                letterSpacing: "1px",
              }}
            >
              RGB789
            </span>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1
            className="text-4xl font-bold tracking-widest mb-1"
            style={{
              background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 50%, #ffd700 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Kanit', sans-serif",
              animation: "shimmerText 2s ease-in-out infinite",
              backgroundSize: "200% auto",
            }}
          >
            RGB789
          </h1>
          <p
            className="text-sm tracking-widest"
            style={{
              color: "rgba(200, 160, 255, 0.8)",
              fontFamily: "'Kanit', sans-serif",
              animation: "fadeInUp 0.8s ease-out 0.3s both",
            }}
          >
            คาสิโนออนไลน์อันดับ 1
          </p>
        </div>

        {/* Coin icons row */}
        <div
          className="flex gap-3 items-center"
          style={{ animation: "fadeInUp 0.8s ease-out 0.5s both" }}
        >
          {["🎰", "🎲", "💰", "🃏", "⚡"].map((icon, i) => (
            <span
              key={i}
              className="text-2xl"
              style={{
                animation: `bounce 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
                filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))",
              }}
            >
              {icon}
            </span>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="w-64 rounded-full overflow-hidden"
          style={{
            height: "4px",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "fadeInUp 0.8s ease-out 0.6s both",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #9333ea, #ffd700, #9333ea)",
              backgroundSize: "200% auto",
              animation: "shimmerBar 1.5s linear infinite",
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
            }}
          />
        </div>

        {/* Loading text */}
        <p
          className="text-xs tracking-widest"
          style={{
            color: "rgba(200, 160, 255, 0.6)",
            fontFamily: "'Kanit', sans-serif",
            animation: "fadeInUp 0.8s ease-out 0.7s both",
          }}
        >
          กำลังโหลด... {Math.round(progress)}%
        </p>
      </div>

      {/* CSS keyframes via style tag */}
      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes shimmerText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shimmerBar {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
