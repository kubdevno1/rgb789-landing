// Design: Electric Stadium — Promotion banner with generated image
// SEO: Promotion content with relevant keywords

import { IMAGES, SITE_INFO } from "@/lib/constants";
import { trackRegisterClick } from "@/lib/analytics";
import { motion } from "framer-motion";

export default function PromoBanner() {
  return (
    <section className="py-8 sm:py-12 lg:py-16" id="promotions">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Changed outer <a> to <div> to avoid nested anchor tag error */}
          <div
            className="block relative overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer"
            style={{
              boxShadow: "0 0 40px rgba(139,92,246,0.2), 0 8px 32px rgba(0,0,0,0.4)",
            }}
            onClick={() => {
              trackRegisterClick("promo-banner");
              window.open(SITE_INFO.registerUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <img
              src={IMAGES.promoBanner}
              alt="RGB789 โปรโมชั่น ทุกยอดฝากรับ 2% ทุกวัน"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6"
              style={{
                background: "linear-gradient(180deg, rgba(15,2,37,0.3) 0%, rgba(15,2,37,0.6) 100%)",
              }}
            >
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-2 sm:mb-3"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  background: "linear-gradient(135deg, #FFD700 0%, #FFE066 50%, #FFD700 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
                }}
              >
                ทุกยอดฝาก รับ 2% ทุกวัน
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg xl:text-xl font-medium" style={{ fontFamily: "'Kanit', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                สมัครสมาชิกวันนี้ รับโบนัสทันที!
              </p>
              <a
                href="/promotions"
                onClick={(e) => e.stopPropagation()}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  textShadow: "none",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }}
              >
                🎁 ดูโปรโมชั่นทั้งหมด 12 รายการ
              </a>
            </div>
            {/* Animated border */}
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
              style={{
                border: "2px solid transparent",
                background: "linear-gradient(135deg, rgba(255,215,0,0.3), rgba(139,92,246,0.3)) border-box",
                mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
