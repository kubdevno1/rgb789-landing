// Design: Electric Stadium — LINE floating contact button
// Provides quick access to LINE customer support

import { SITE_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export default function LineFloatingButton() {
  return (
    <motion.a
      href={SITE_INFO.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, type: "spring", stiffness: 200 }}
      className="fixed right-4 bottom-20 lg:bottom-6 z-50 group"
      aria-label="ติดต่อเราผ่าน LINE"
    >
      {/* Pulse ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: "pulse-glow 2s ease-in-out infinite",
          background: "rgba(6, 199, 85, 0.3)",
        }}
      />

      {/* Button */}
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #06C755 0%, #04B34A 100%)",
          boxShadow: "0 4px 20px rgba(6, 199, 85, 0.4), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* LINE icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
        </svg>
      </div>

      {/* Tooltip */}
      <div
        className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "rgba(15,2,37,0.95)",
          border: "1px solid rgba(139,92,246,0.3)",
          color: "#06C755",
          fontFamily: "'Kanit', sans-serif",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        ติดต่อเจ้าหน้าที่ LINE
      </div>
    </motion.a>
  );
}
