// Design: Electric Stadium — Payment methods and trust badges
// SEO: Trust signals for payment security

import { PAYMENT_METHODS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function PaymentMethods() {
  return (
    <section className="py-16 lg:py-20 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl lg:text-3xl font-bold mb-6"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFC107)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                วิธีการชำระเงิน
              </span>
            </h2>
            <p className="text-white/60 mb-8">
              รองรับธนาคารชั้นนำทุกธนาคาร ฝาก-ถอนสะดวกรวดเร็วผ่านระบบออโต้
            </p>
            <div className="flex flex-wrap gap-3">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {method}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl lg:text-3xl font-bold mb-6"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFC107)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ความปลอดภัยและใบอนุญาต
              </span>
            </h2>
            <p className="text-white/60 mb-8">
              RGB789 ได้รับใบอนุญาตถูกต้องตามกฎหมาย พร้อมระบบรักษาความปลอดภัยระดับสูงสุด
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "PAGCOR", desc: "ใบอนุญาตถูกต้อง" },
                { name: "BeGambleAware", desc: "เล่นอย่างรับผิดชอบ" },
                { name: "SSL Secured", desc: "เข้ารหัสข้อมูล 256-bit" },
                { name: "iovation", desc: "ป้องกันการฉ้อโกง" },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className="glass-card rounded-xl p-5 text-center transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className="text-lg font-bold mb-1"
                    style={{
                      fontFamily: "'Kanit', sans-serif",
                      color: "#FFD700",
                    }}
                  >
                    {badge.name}
                  </div>
                  <div className="text-xs text-white/50">{badge.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
