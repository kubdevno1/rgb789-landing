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
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 text-white"
              style={{
                fontFamily: "'Kanit', sans-serif",
                border: "1px solid rgba(139,92,246,0.4)",
                background: "rgba(139,92,246,0.1)",
              }}
            >
              ติดต่อเรา
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
