// Design: Electric Stadium — Feature grid with icons
// SEO: Trust signals and feature highlights

import { motion } from "framer-motion";
import { Shield, Zap, Headphones, CreditCard, Smartphone, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "ปลอดภัย 100%",
    description: "ได้รับใบอนุญาตถูกต้องตามกฎหมาย ระบบ SSL Encryption ปกป้องข้อมูลส่วนตัวและธุรกรรมทางการเงิน",
  },
  {
    icon: Zap,
    title: "ฝากถอนออโต้ 30 วินาที",
    description: "ระบบฝาก-ถอนอัตโนมัติที่เร็วที่สุด ไม่ต้องรอนาน ไม่มีขั้นต่ำ รองรับทุกธนาคาร",
  },
  {
    icon: Headphones,
    title: "บริการ 24 ชั่วโมง",
    description: "ทีมงานคอยให้บริการตลอด 24 ชั่วโมง พร้อมช่วยเหลือทุกปัญหา ผ่าน LINE และ Live Chat",
  },
  {
    icon: CreditCard,
    title: "รองรับทุกธนาคาร",
    description: "รองรับธนาคารชั้นนำทุกธนาคาร รวมถึง TrueMoney Wallet ฝาก-ถอนสะดวกรวดเร็ว",
  },
  {
    icon: Smartphone,
    title: "เล่นผ่านมือถือ",
    description: "รองรับทุกอุปกรณ์ ทั้ง iOS และ Android ไม่ต้องดาวน์โหลดแอป เล่นผ่านเว็บเบราว์เซอร์ได้ทันที",
  },
  {
    icon: Award,
    title: "โปรโมชั่นจัดเต็ม",
    description: "โบนัสต้อนรับสมาชิกใหม่ คืนยอดเสีย ทุกยอดฝากรับ 2% ทุกวัน และโปรโมชั่นพิเศษอีกมากมาย",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 relative" id="features">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.04) 0%, transparent 50%)",
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
            <span className="text-white">ทำไมต้อง </span>
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              RGB789
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            เว็บพนันออนไลน์ที่ได้รับความไว้วางใจจากสมาชิกกว่า 50,000 คน
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="glass-card rounded-2xl p-8 h-full transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(139,92,246,0.15) 100%)",
                    border: "1px solid rgba(255,215,0,0.2)",
                  }}
                >
                  <feature.icon size={26} style={{ color: "#FFD700" }} />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-3"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
