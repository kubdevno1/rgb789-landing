// Design: Electric Stadium — Game category cards with generated images
// SEO: Rich content for each game category

import { IMAGES, SITE_INFO, CASINO_PROVIDERS, SLOT_PROVIDERS, SPORTS_PROVIDERS } from "@/lib/constants";
import { motion } from "framer-motion";

const categories = [
  {
    id: "sports",
    title: "แทงบอลออนไลน์",
    subtitle: "ราคาบอลดีที่สุด ครบทุกลีก",
    description: "แทงบอลออนไลน์กับ RGB789 ราคาบอลดีที่สุด ครบทุกลีกดังทั่วโลก พรีเมียร์ลีก ลาลีกา บุนเดสลีกา เซเรียอา ลีกเอิง และอีกมากมาย รองรับทั้งบอลสเต็ป บอลเดี่ยว บอลสด",
    image: IMAGES.sportsBetting,
    providers: SPORTS_PROVIDERS,
    icon: "⚽",
  },
  {
    id: "casino",
    title: "คาสิโนสด",
    subtitle: "ถ่ายทอดสดจากค่ายดังระดับโลก",
    description: "คาสิโนสดออนไลน์ ถ่ายทอดสดจากสตูดิโอระดับโลก บาคาร่า รูเล็ต ไฮโล เสือมังกร พร้อมดีลเลอร์สาวสวยให้บริการตลอด 24 ชั่วโมง ภาพคมชัด HD ไม่มีสะดุด",
    image: IMAGES.casinoLive,
    providers: CASINO_PROVIDERS,
    icon: "🎰",
  },
  {
    id: "slots",
    title: "เกมสล็อตออนไลน์",
    subtitle: "แตกง่าย จ่ายจริง รวมทุกค่ายดัง",
    description: "สล็อตออนไลน์ รวมเกมสล็อตจากทุกค่ายดัง PG Soft, Pragmatic Play, Joker Gaming และอีกมากมาย กว่า 1,000 เกม แตกง่าย จ่ายจริง RTP สูง โบนัสแตกบ่อย",
    image: IMAGES.slotGames,
    providers: SLOT_PROVIDERS,
    icon: "🎲",
  },
];

export default function GameCategories() {
  return (
    <section className="py-16 lg:py-24 relative" id="games">
      <div className="container">
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
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              เกมคาสิโนครบวงจร
            </span>
            <span className="text-white"> ที่ RGB789</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            รวมเกมจากค่ายดังทั่วโลกไว้ในที่เดียว ไม่ว่าจะเป็นแทงบอล คาสิโนสด สล็อต เกมยิงปลา
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 lg:gap-16">
          {categories.map((cat, index) => (
            <motion.article
              key={cat.id}
              id={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 4px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <img
                    src={cat.image}
                    alt={`${cat.title} RGB789 - ${cat.subtitle}`}
                    className="w-full h-64 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: index % 2 === 0
                        ? "linear-gradient(90deg, transparent 60%, rgba(15,2,37,0.8) 100%)"
                        : "linear-gradient(270deg, transparent 60%, rgba(15,2,37,0.8) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3
                    className="text-2xl lg:text-3xl font-bold mb-3"
                    style={{
                      fontFamily: "'Kanit', sans-serif",
                      background: "linear-gradient(135deg, #FFD700, #FFC107)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-white/50 text-sm font-medium mb-4" style={{ fontFamily: "'Kanit', sans-serif" }}>
                    {cat.subtitle}
                  </p>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Providers */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.providers.map((provider) => (
                      <span
                        key={provider}
                        className="px-3 py-1 text-xs font-medium rounded-full"
                        style={{
                          background: "rgba(139,92,246,0.2)",
                          border: "1px solid rgba(139,92,246,0.3)",
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "'Kanit', sans-serif",
                        }}
                      >
                        {provider}
                      </span>
                    ))}
                  </div>

                  <a
                    href={SITE_INFO.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105 self-start"
                    style={{
                      fontFamily: "'Kanit', sans-serif",
                      background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                      color: "#1a0533",
                      boxShadow: "0 0 20px rgba(255,215,0,0.2), 0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    เล่นเลย
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
