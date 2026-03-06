// Design: Electric Stadium — Rich SEO content section
// SEO: Long-form content with relevant keywords for search engine ranking

import { motion } from "framer-motion";

export default function SEOContent() {
  return (
    <section className="py-16 lg:py-24 relative" id="about">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(15,2,37,0.5) 50%, transparent 100%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <article className="prose prose-invert max-w-none">
            <h2
              className="text-3xl lg:text-4xl font-bold mb-8 text-center"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFC107)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                RGB789
              </span>
              <span className="text-white"> เว็บพนันออนไลน์ครบวงจร</span>
            </h2>

            <div className="space-y-6 text-white/65 leading-relaxed">
              <p>
                <strong className="text-white/90">RGB789</strong> คือเว็บพนันออนไลน์ครบวงจรอันดับ 1 ในประเทศไทย ที่รวบรวมเกมคาสิโนออนไลน์จากทุกค่ายดังทั่วโลกไว้ในที่เดียว ไม่ว่าจะเป็น <strong className="text-white/90">SA Gaming, Sexy Gaming, PG Slot, Pretty Gaming, Dream Gaming, WM Casino</strong> และอีกมากมาย ให้บริการทั้งคาสิโนสด สล็อตออนไลน์ แทงบอลออนไลน์ เกมยิงปลา และโต๊ะเกม ครบจบในเว็บเดียว
              </p>

              <h3
                className="text-xl font-bold text-white/90 pt-4"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                คาสิโนออนไลน์ RGB789 มีอะไรบ้าง?
              </h3>
              <p>
                ที่ <strong className="text-white/90">RGB789</strong> เรามีเกมคาสิโนออนไลน์ให้เลือกเล่นมากกว่า 1,000 เกม ครอบคลุมทุกประเภทเกมที่นักเดิมพันต้องการ ตั้งแต่ <strong className="text-white/90">บาคาร่าออนไลน์</strong> ที่ถ่ายทอดสดจากสตูดิโอระดับโลก <strong className="text-white/90">สล็อตออนไลน์</strong> จากค่ายดังอย่าง PG Soft, Pragmatic Play, Joker Gaming ที่แตกง่ายจ่ายจริง <strong className="text-white/90">แทงบอลออนไลน์</strong> ราคาดีที่สุดครบทุกลีกดังทั่วโลก ไปจนถึง <strong className="text-white/90">เกมยิงปลา</strong> และ <strong className="text-white/90">โต๊ะเกม</strong> อีกมากมาย
              </p>

              <h3
                className="text-xl font-bold text-white/90 pt-4"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                แทงบอลออนไลน์ ราคาดีที่สุด
              </h3>
              <p>
                สำหรับนักเดิมพันกีฬา <strong className="text-white/90">RGB789</strong> มีระบบแทงบอลออนไลน์ที่ครบครันที่สุด รองรับทั้ง <strong className="text-white/90">บอลสเต็ป บอลเดี่ยว บอลสด</strong> ครบทุกลีกดังทั่วโลก ไม่ว่าจะเป็น พรีเมียร์ลีก, ลาลีกา, บุนเดสลีกา, เซเรียอา, ลีกเอิง และลีกอื่นๆ อีกมากมาย ราคาบอลดีที่สุด ค่าน้ำต่ำ ผ่านผู้ให้บริการชั้นนำอย่าง WS Sports, SABA Sports, CMD Sports, IM Sports, SBOBET และ UG Sports
              </p>

              <h3
                className="text-xl font-bold text-white/90 pt-4"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                สล็อตออนไลน์ แตกง่าย จ่ายจริง
              </h3>
              <p>
                <strong className="text-white/90">สล็อตออนไลน์ RGB789</strong> รวมเกมสล็อตจากทุกค่ายดังกว่า 500 เกม ไม่ว่าจะเป็น PG Soft, Pragmatic Play, Joker Gaming, Spadegaming, CQ9, JILI และอีกมากมาย ทุกเกมมี RTP สูง โบนัสแตกบ่อย ฟรีสปินเพียบ พร้อมระบบทดลองเล่นฟรีก่อนเดิมพันจริง
              </p>

              <h3
                className="text-xl font-bold text-white/90 pt-4"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                ระบบฝาก-ถอนออโต้ รวดเร็วที่สุด
              </h3>
              <p>
                <strong className="text-white/90">RGB789</strong> ใช้ระบบฝาก-ถอนอัตโนมัติ (Auto) ที่ทันสมัยและรวดเร็วที่สุด ฝากเงินภายใน 30 วินาที ถอนเงินภายใน 1-3 นาที ไม่มีขั้นต่ำ รองรับธนาคารชั้นนำทุกธนาคาร ได้แก่ กสิกรไทย, ไทยพาณิชย์, กรุงเทพ, กรุงศรี, ออมสิน, ทหารไทยธนชาต, กรุงไทย และ TrueMoney Wallet
              </p>

              <h3
                className="text-xl font-bold text-white/90 pt-4"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                โปรโมชั่น RGB789 สุดคุ้ม
              </h3>
              <p>
                สมาชิก <strong className="text-white/90">RGB789</strong> ทุกท่านจะได้รับโปรโมชั่นสุดพิเศษมากมาย ไม่ว่าจะเป็นโบนัสต้อนรับสมาชิกใหม่ คืนยอดเสียทุกสัปดาห์ <strong className="text-white/90">ทุกยอดฝากรับ 2% ทุกวัน</strong> และโปรโมชั่นพิเศษอื่นๆ ที่อัปเดตเป็นประจำ สมัครสมาชิกวันนี้เพื่อรับสิทธิพิเศษทั้งหมด
              </p>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
