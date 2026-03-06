// Design: Electric Stadium — 3-step registration process with glass cards
// SEO: Step-by-step guide content

import { STEPS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function StepsSection() {
  return (
    <section className="py-16 lg:py-24 relative" id="how-to">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <span className="text-white">เริ่มต้นกับ </span>
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              RGB789
            </span>
            <span className="text-white"> ง่ายๆ 3 ขั้นตอน</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            สมัครสมาชิกและเริ่มเดิมพันได้ทันที ใช้เวลาไม่ถึง 5 นาที
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div
                className="glass-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                {/* Step Number */}
                <div
                  className="text-6xl font-black mb-4 opacity-20"
                  style={{
                    fontFamily: "'Kanit', sans-serif",
                    background: "linear-gradient(135deg, #FFD700, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (not on last) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 w-8 lg:w-10 h-0.5 bg-gradient-to-r from-purple-500/40 to-yellow-500/40" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
