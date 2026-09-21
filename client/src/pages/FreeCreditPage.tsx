// SEO: หน้าเครดิตฟรี — keyword volume 90,500/เดือน
// Target keywords: เครดิตฟรี, เครดิตฟรีไม่ต้องฝาก, เครดิตฟรีไม่ต้องฝากไม่ต้องแชร์, รับเครดิตฟรี, สล็อตเครดิตฟรี
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import Breadcrumb from "@/components/Breadcrumb";
import { useSEO } from "@/hooks/useSEO";
import { SITE_INFO } from "@/lib/constants";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR";

// โปรโมชั่นเครดิตฟรีที่มีอยู่
const FREE_CREDIT_PROMOS = [
  {
    id: "new-member",
    title: "สมาชิกใหม่ ฝาก 100 รับ 200",
    badge: "ยอดนิยม",
    badgeColor: "#FFD700",
    description: "สมัครใหม่วันนี้ ฝากเงินเพียง 100 บาท รับโบนัสทันที 200 บาท เล่นได้เลยไม่ต้องรอ",
    condition: "ฝากขั้นต่ำ 100 บาท | ทำยอด 3 เทิร์น | ถอนสูงสุด 5,000 บาท",
    image: `${CDN}/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%8A%E0%B8%B4%E0%B8%81%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%9D%E0%B8%B2%E0%B8%81100%E0%B8%A3%E0%B8%B1%E0%B8%9A200%E0%B8%9A%E0%B8%B2%E0%B8%97new_a63601a2.jpg`,
    cta: "รับโบนัสทันที",
    highlight: "รับ 200 บาท",
  },
  {
    id: "birthday",
    title: "โปรวันเกิด รับเครดิตฟรี 500 บาท",
    badge: "วันเกิด",
    badgeColor: "#8b5cf6",
    description: "รับเครดิตฟรี 500 บาท ในวันเกิดของคุณ แจ้งแอดมินผ่าน LINE พร้อมแนบสำเนาบัตรประชาชน",
    condition: "เป็นสมาชิก RGB789 | แจ้งแอดมินในวันเกิด | ไม่ต้องฝากเงิน",
    image: `${CDN}/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%81%E0%B8%B4%E0%B8%94%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%94%E0%B8%B4%E0%B8%95%E0%B8%9F%E0%B8%A3%E0%B8%B5500%E0%B8%9A%E0%B8%B2%E0%B8%97_eec5132d.jpg`,
    cta: "รับเครดิตฟรีวันเกิด",
    highlight: "ฟรี 500 บาท",
  },
  {
    id: "cashback",
    title: "คืนยอดเสีย 7% ทุกวัน",
    badge: "ทุกวัน",
    badgeColor: "#10b981",
    description: "เสียเท่าไหร่ก็ได้คืน 7% ทุกวัน ไม่มีขั้นต่ำ ไม่ต้องทำเทิร์น โอนเข้ากระเป๋าอัตโนมัติ",
    condition: "ไม่มีขั้นต่ำ | ไม่ต้องทำเทิร์น | รับอัตโนมัติทุกวัน",
    image: `${CDN}/%E0%B8%84%E0%B8%B7%E0%B8%99%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B8%A2%E0%B8%AA%E0%B8%B9%E0%B8%87%E0%B8%AA%E0%B8%B8%E0%B8%947%25_2887cc55.jpg`,
    cta: "รับคืนยอดเสีย",
    highlight: "คืน 7%",
  },
  {
    id: "wheel",
    title: "ฝาก 300 บาท หมุนกงล้อฟรี",
    badge: "ทุกวัน",
    badgeColor: "#f97316",
    description: "ฝากเงิน 300 บาทขึ้นไป รับสิทธิ์หมุนกงล้อฟรี 1 ครั้งต่อวัน ลุ้นรับรางวัลสูงสุดทองคำ 1 บาท",
    condition: "ฝากขั้นต่ำ 300 บาท | รับสิทธิ์ 1 ครั้ง/วัน | ลุ้นรับทองคำ",
    image: `${CDN}/%E0%B8%9D%E0%B8%B2%E0%B8%81300%E0%B8%AB%E0%B8%A1%E0%B8%B8%E0%B8%99%E0%B8%81%E0%B8%87%E0%B8%A5%E0%B9%89%E0%B8%AD_a150bdb0.jpg`,
    cta: "รับสิทธิ์หมุนกงล้อ",
    highlight: "ฟรีทุกวัน",
  },
];

// FAQ สำหรับ Rich Snippet
const FAQ_ITEMS = [
  {
    q: "เครดิตฟรี RGB789 ไม่ต้องฝากได้จริงไหม?",
    a: "ได้จริง! RGB789 มีโปรโมชั่นเครดิตฟรีไม่ต้องฝากสำหรับสมาชิกใหม่และสมาชิกเก่า เช่น โปรวันเกิดรับเครดิตฟรี 500 บาท ไม่ต้องฝากเงิน เพียงแจ้งแอดมินผ่าน LINE",
  },
  {
    q: "เครดิตฟรีต้องทำเทิร์นเท่าไหร่ถึงจะถอนได้?",
    a: "ขึ้นอยู่กับโปรโมชั่น โดยทั่วไปต้องทำยอดเดิมพัน 3-5 เทิร์น ยกเว้นโปรคืนยอดเสีย 7% ที่ไม่ต้องทำเทิร์นเลย สามารถถอนได้ทันที",
  },
  {
    q: "สมัครสมาชิก RGB789 ใช้เวลานานไหม?",
    a: "ใช้เวลาเพียง 3 นาที สมัครผ่าน LINE @311ukzxq ได้เลย ไม่ต้องกรอกฟอร์มยาว ไม่ต้องยืนยันตัวตนซับซ้อน",
  },
  {
    q: "เครดิตฟรีใช้เล่นเกมอะไรได้บ้าง?",
    a: "ใช้ได้กับทุกเกมในเว็บ ทั้งสล็อตออนไลน์, บาคาร่า, รูเล็ต, เกมยิงปลา และแทงบอล ไม่มีข้อจำกัดเกม",
  },
  {
    q: "ฝากถอนเงินใช้เวลานานไหม?",
    a: "ระบบฝากถอนออโต้ ใช้เวลาไม่เกิน 30 วินาที รองรับทุกธนาคาร และ TrueMoney Wallet ตลอด 24 ชั่วโมง",
  },
];

export default function FreeCreditPage() {
  useSEO({
    title: "เครดิตฟรี RGB789 | รับเครดิตฟรีไม่ต้องฝาก ไม่ต้องแชร์ 2025",
    description: "รับเครดิตฟรี RGB789 ไม่ต้องฝาก ไม่ต้องแชร์ สมาชิกใหม่ฝาก100รับ200 โปรวันเกิดรับ500บาท คืนยอดเสีย7%ทุกวัน สมัครฟรีใช้เวลา3นาที",
    keywords: "เครดิตฟรี, เครดิตฟรีไม่ต้องฝาก, เครดิตฟรีไม่ต้องแชร์, รับเครดิตฟรี, สล็อตเครดิตฟรี, โบนัสฟรี, ฝาก100รับ200, RGB789 เครดิตฟรี",
    canonical: "https://rgb789.fun/free-credit",
    ogTitle: "เครดิตฟรี RGB789 | รับเครดิตฟรีไม่ต้องฝาก ไม่ต้องแชร์",
    ogDescription: "รับเครดิตฟรี RGB789 ไม่ต้องฝาก ไม่ต้องแชร์ สมาชิกใหม่ฝาก100รับ200 โปรวันเกิดรับ500บาท คืนยอดเสีย7%ทุกวัน",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/promo-banner-4ghucn5AArY73W8K5B9gjq.webp",
  });

  // JSON-LD FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  // JSON-LD WebPage schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "เครดิตฟรี RGB789 | รับเครดิตฟรีไม่ต้องฝาก ไม่ต้องแชร์ 2025",
    "description": "รับเครดิตฟรี RGB789 ไม่ต้องฝาก ไม่ต้องแชร์ สมาชิกใหม่ฝาก100รับ200 โปรวันเกิดรับ500บาท คืนยอดเสีย7%ทุกวัน",
    "url": "https://rgb789.fun/free-credit",
    "publisher": {
      "@type": "Organization",
      "name": "RGB789",
      "url": "https://rgb789.fun",
    },
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0225 0%, #1a0533 10%, #0f0225 100%)" }}
    >
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <Header />
      <LineFloatingButton />

      <main className="pb-20 lg:pb-0">
        {/* Hero Section */}
        <section
          className="relative py-14 lg:py-20 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 40%, #0f3d1a 100%)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="container relative z-10">
            {/* Breadcrumb */}
            <div className="flex justify-center mb-6">
              <Breadcrumb items={[
                { label: "เครดิตฟรี", href: "/free-credit" },
              ]} />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
              style={{ borderColor: "rgba(16,185,129,0.4)", background: "rgba(16,185,129,0.1)" }}>
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#10b981", fontFamily: "'Kanit', sans-serif" }}>
                🎁 โปรโมชั่นพิเศษ 2025
              </span>
            </div>

            <h1
              className="text-3xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span style={{ background: "linear-gradient(135deg, #10b981, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                เครดิตฟรี
              </span>
              <br />
              <span className="text-white">ไม่ต้องฝาก ไม่ต้องแชร์</span>
            </h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Kanit', sans-serif" }}>
              รับ<strong className="text-green-400">เครดิตฟรี</strong>จาก RGB789 ได้หลายช่องทาง ทั้งสมาชิกใหม่และสมาชิกเก่า
              <br />ฝากถอนออโต้ไว ไม่มีขั้นต่ำ ตลอด 24 ชั่วโมง
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { value: "500 บาท", label: "เครดิตฟรีสูงสุด" },
                { value: "7%", label: "คืนยอดเสียทุกวัน" },
                { value: "3 นาที", label: "สมัครสมาชิกฟรี" },
                { value: "24/7", label: "ฝากถอนออโต้" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "#10b981", fontFamily: "'Kanit', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={SITE_INFO.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                fontFamily: "'Kanit', sans-serif",
                boxShadow: "0 0 30px rgba(16,185,129,0.4)",
              }}
            >
              🎁 รับเครดิตฟรีเลย
            </a>
          </div>
        </section>

        {/* Promo Cards */}
        <section className="py-12">
          <div className="container">
            <h2
              className="text-2xl lg:text-3xl font-bold text-center mb-8"
              style={{ fontFamily: "'Kanit', sans-serif", color: "#fff" }}
            >
              โปรโมชั่น<span style={{ color: "#10b981" }}>เครดิตฟรี</span>ทั้งหมด
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FREE_CREDIT_PROMOS.map((promo) => (
                <div
                  key={promo.id}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,2,37,0.8) 0%, transparent 60%)" }} />
                    {/* Badge */}
                    <span
                      className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: promo.badgeColor, color: "#fff", fontFamily: "'Kanit', sans-serif" }}
                    >
                      {promo.badge}
                    </span>
                    {/* Highlight */}
                    <span
                      className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-sm font-bold"
                      style={{ background: "rgba(0,0,0,0.7)", color: "#10b981", border: "1px solid rgba(16,185,129,0.4)", fontFamily: "'Kanit', sans-serif" }}
                    >
                      {promo.highlight}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#fff", fontFamily: "'Kanit', sans-serif" }}>
                      {promo.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {promo.description}
                    </p>
                    <div
                      className="text-xs px-3 py-2 rounded-lg mb-4"
                      style={{ background: "rgba(16,185,129,0.08)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(16,185,129,0.15)" }}
                    >
                      📋 เงื่อนไข: {promo.condition}
                    </div>
                    <a
                      href={SITE_INFO.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center py-3 rounded-xl font-bold text-sm transition-all"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#fff",
                        fontFamily: "'Kanit', sans-serif",
                      }}
                    >
                      {promo.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Free Credit */}
        <section className="py-12" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(16,185,129,0.1)" }}>
          <div className="container max-w-3xl">
            <h2
              className="text-2xl lg:text-3xl font-bold text-center mb-10"
              style={{ fontFamily: "'Kanit', sans-serif", color: "#fff" }}
            >
              วิธีรับ<span style={{ color: "#10b981" }}>เครดิตฟรี</span>ง่ายๆ 3 ขั้นตอน
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "สมัครสมาชิก",
                  desc: "สมัครผ่าน LINE @311ukzxq ใช้เวลาเพียง 3 นาที ไม่ต้องกรอกฟอร์มยาว",
                  icon: "📱",
                },
                {
                  step: "02",
                  title: "เลือกโปรโมชั่น",
                  desc: "แจ้งแอดมินว่าต้องการรับโปรโมชั่นไหน ทีมงานพร้อมช่วยเหลือ 24 ชั่วโมง",
                  icon: "🎁",
                },
                {
                  step: "03",
                  title: "รับเครดิตฟรี",
                  desc: "เครดิตเข้ากระเป๋าทันที เล่นได้เลย ฝากถอนออโต้ไม่เกิน 30 วินาที",
                  icon: "💰",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                    style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))", border: "1px solid rgba(16,185,129,0.3)" }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold mb-1" style={{ color: "#10b981" }}>STEP {item.step}</div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#fff", fontFamily: "'Kanit', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFA500)",
                  color: "#0f0225",
                  fontFamily: "'Kanit', sans-serif",
                  boxShadow: "0 0 30px rgba(255,215,0,0.3)",
                }}
              >
                สมัครสมาชิกฟรี รับเครดิตเลย
              </a>
            </div>
          </div>
        </section>

        {/* SEO Article Content */}
        <section className="py-12">
          <div className="container max-w-3xl">
            <article>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "#fff", fontFamily: "'Kanit', sans-serif" }}
              >
                เครดิตฟรี RGB789 คืออะไร? ทำไมถึงได้รับความนิยม
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                <p>
                  <strong className="text-white">เครดิตฟรี</strong>คือโบนัสที่เว็บพนันออนไลน์มอบให้กับสมาชิก เพื่อให้ทดลองเล่นเกมต่างๆ โดยไม่ต้องเสียเงินเพิ่ม หรือในบางกรณีไม่ต้องฝากเงินเลย <strong className="text-green-400">RGB789</strong> มีโปรโมชั่นเครดิตฟรีหลากหลายรูปแบบ ตั้งแต่โบนัสสมาชิกใหม่ไปจนถึงโปรโมชั่นประจำวัน
                </p>
                <p>
                  สำหรับ<strong className="text-white">เครดิตฟรีไม่ต้องฝาก</strong>ที่ได้รับความนิยมสูงสุด คือ <strong className="text-green-400">โปรวันเกิดรับเครดิตฟรี 500 บาท</strong> ซึ่งสมาชิกทุกคนสามารถรับได้โดยไม่ต้องฝากเงิน เพียงแจ้งแอดมินผ่าน LINE ในวันเกิด
                </p>
                <p>
                  นอกจากนี้ยังมี<strong className="text-white">คืนยอดเสีย 7% ทุกวัน</strong> ซึ่งถือเป็นเครดิตฟรีรูปแบบหนึ่ง เพราะได้รับเงินคืนโดยไม่ต้องทำเทิร์นเพิ่ม สามารถถอนได้ทันที ทำให้ RGB789 เป็นเว็บที่ผู้เล่นไว้วางใจมากที่สุด
                </p>

                <h3 className="text-xl font-bold pt-4" style={{ color: "#fff", fontFamily: "'Kanit', sans-serif" }}>
                  ข้อดีของเครดิตฟรี RGB789 เทียบกับเว็บอื่น
                </h3>
                <ul className="space-y-2 pl-4">
                  {[
                    "ไม่ต้องฝากเงินก็รับเครดิตฟรีได้ (โปรวันเกิด)",
                    "ไม่ต้องแชร์โพสต์หรือทำภารกิจยุ่งยาก",
                    "เงื่อนไขการถอนโปร่งใส ไม่มีเงื่อนไขซ่อนเร้น",
                    "ฝากถอนออโต้ไม่เกิน 30 วินาที",
                    "รองรับทุกธนาคารและ TrueMoney Wallet",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: "#10b981" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(16,185,129,0.1)" }}>
          <div className="container max-w-3xl">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ color: "#fff", fontFamily: "'Kanit', sans-serif" }}
            >
              คำถามที่พบบ่อยเกี่ยวกับ<span style={{ color: "#10b981" }}>เครดิตฟรี</span>
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,185,129,0.15)" }}
                >
                  <h3 className="font-bold mb-2" style={{ color: "#10b981", fontFamily: "'Kanit', sans-serif" }}>
                    Q: {item.q}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    A: {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <h2
              className="text-xl font-bold text-center mb-6"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Kanit', sans-serif" }}
            >
              เนื้อหาที่เกี่ยวข้อง
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/demo-slot">
                <div
                  className="p-5 rounded-xl cursor-pointer transition-all"
                  style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}
                >
                  <div className="text-2xl mb-2">🎮</div>
                  <div className="font-bold mb-1" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>
                    ทดลองเล่นสล็อตฟรี
                  </div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    ทดลองเล่นสล็อตออนไลน์ฟรีก่อนเดิมพันจริง ไม่ต้องสมัคร
                  </p>
                </div>
              </Link>
              <Link href="/articles">
                <div
                  className="p-5 rounded-xl cursor-pointer transition-all"
                  style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.2)" }}
                >
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-bold mb-1" style={{ color: "#8b5cf6", fontFamily: "'Kanit', sans-serif" }}>
                    เทคนิคสล็อต & สูตรบาคาร่า
                  </div>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    อ่านบทความเทคนิคการเล่นสล็อตและบาคาร่าจากผู้เชี่ยวชาญ
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  );
}
