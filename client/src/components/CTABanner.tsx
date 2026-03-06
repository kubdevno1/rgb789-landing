// Design: Electric Stadium — Call-to-action banner before footer
// SEO: Final conversion section

import { SITE_INFO } from "@/lib/constants";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, rgba(255,215,0,0.05) 0%, transparent 40%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <span className="text-white">พร้อมเริ่มต้นกับ </span>
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC107, #FFE066, #FFD700)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 16px rgba(255,215,0,0.3))",
              }}
            >
              RGB789
            </span>
            <span className="text-white"> แล้วหรือยัง?</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            สมัครสมาชิกวันนี้ รับโบนัสต้อนรับทันที พร้อมโปรโมชั่นสุดพิเศษอีกมากมาย
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SITE_INFO.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Kanit', sans-serif",
                background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                color: "#1a0533",
                boxShadow: "0 0 30px rgba(255,215,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            >
              สมัครสมาชิกเลย
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href={SITE_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 text-white"
              style={{
                fontFamily: "'Kanit', sans-serif",
                border: "1px solid rgba(139,92,246,0.4)",
                background: "rgba(139,92,246,0.1)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              ติดต่อสอบถาม LINE
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
