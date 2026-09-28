// SEO: หน้าทดลองเล่นสล็อต — keyword volume 201,000/เดือน
// Target keywords: ทดลองเล่นสล็อต, สล็อตทดลองเล่น, สล็อตฟรี, ทดลองเล่นสล็อตฟรี

import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import { SITE_INFO, SLOT_PROVIDERS } from "@/lib/constants";
import { Suspense } from "react";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb from "@/components/Breadcrumb";
import { trackPlayGameClick, trackRegisterClick } from "@/lib/analytics";

// ข้อมูลเกมสล็อตทดลองเล่น
const DEMO_GAMES = [
  {
    id: "pg-mahjong",
    name: "Mahjong Ways",
    provider: "PG Soft",
    rtp: "96.95%",
    volatility: "สูง",
    minBet: "฿1",
    tag: "ยอดนิยม",
    tagColor: "#FFD700",
    description: "สล็อตไพ่นกกระจอก แตกง่าย โบนัสสูง",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "pg-fortune-tiger",
    name: "Fortune Tiger",
    provider: "PG Soft",
    rtp: "96.81%",
    volatility: "กลาง",
    minBet: "฿1",
    tag: "แตกบ่อย",
    tagColor: "#FF6B35",
    description: "เสือทอง โชคลาภ ฟีเจอร์โบนัสสุดพิเศษ",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "pp-gates-olympus",
    name: "Gates of Olympus",
    provider: "Pragmatic Play",
    rtp: "96.50%",
    volatility: "สูงมาก",
    minBet: "฿1",
    tag: "Jackpot",
    tagColor: "#9B59B6",
    description: "ประตูแห่งโอลิมปัส โบนัส x500",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "joker-roma",
    name: "Roma",
    provider: "Joker Gaming",
    rtp: "97.00%",
    volatility: "กลาง",
    minBet: "฿1",
    tag: "RTP สูง",
    tagColor: "#27AE60",
    description: "สล็อตโรมัน ฟีเจอร์ฟรีสปิน",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "pg-sweet-bonanza",
    name: "Sweet Bonanza",
    provider: "Pragmatic Play",
    rtp: "96.48%",
    volatility: "สูง",
    minBet: "฿1",
    tag: "ใหม่",
    tagColor: "#E91E63",
    description: "ลูกอมหวาน โบนัสแตกง่าย",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "cq9-space",
    name: "Space Neon",
    provider: "CQ9",
    rtp: "96.20%",
    volatility: "กลาง",
    minBet: "฿1",
    tag: "ฟรีสปิน",
    tagColor: "#00BCD4",
    description: "สล็อตอวกาศ ฟรีสปินสุดมันส์",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "jili-boxing",
    name: "Boxing King",
    provider: "JILI",
    rtp: "97.10%",
    volatility: "สูง",
    minBet: "฿1",
    tag: "RTP สูง",
    tagColor: "#27AE60",
    description: "ราชามวย ชนะรับโบนัสใหญ่",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: "spade-fa-cai",
    name: "Fa Cai Shen",
    provider: "Spadegaming",
    rtp: "96.00%",
    volatility: "ต่ำ",
    minBet: "฿1",
    tag: "เหมาะผู้เริ่มต้น",
    tagColor: "#FF9800",
    description: "เทพเจ้าแห่งโชคลาภ เล่นง่าย",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
];

const PROVIDER_FILTERS = ["ทั้งหมด", "PG Soft", "Pragmatic Play", "Joker Gaming", "CQ9", "JILI", "Spadegaming"];

const FAQ_DEMO = [
  {
    q: "ทดลองเล่นสล็อตฟรีได้ไหม ไม่ต้องสมัครสมาชิก?",
    a: "ได้เลย! RGB789 เปิดให้ทดลองเล่นสล็อตฟรีทุกเกมโดยไม่ต้องสมัครสมาชิก ไม่ต้องฝากเงิน เพียงกดปุ่ม 'ทดลองเล่นฟรี' ได้ทันที",
  },
  {
    q: "ทดลองเล่นสล็อตต่างจากเล่นจริงอย่างไร?",
    a: "โหมดทดลองเล่นใช้เครดิตสมมติ ไม่ใช่เงินจริง แต่ระบบเกม RTP และฟีเจอร์โบนัสเหมือนกันทุกอย่าง เหมาะสำหรับฝึกฝนก่อนเล่นจริง",
  },
  {
    q: "สล็อตค่ายไหนแตกง่ายที่สุด?",
    a: "PG Soft และ Pragmatic Play เป็นค่ายที่ได้รับความนิยมสูงสุด โดยเฉพาะ Mahjong Ways, Gates of Olympus และ Sweet Bonanza ที่มีโบนัสแตกบ่อย",
  },
  {
    q: "RTP คืออะไร สำคัญไหม?",
    a: "RTP (Return to Player) คืออัตราการจ่ายเงินคืนผู้เล่น ยิ่งสูงยิ่งดี เช่น RTP 97% หมายถึงทุก ฿100 ที่เดิมพัน จะได้รับเงินคืนเฉลี่ย ฿97 ในระยะยาว",
  },
  {
    q: "เล่นสล็อตบนมือถือได้ไหม?",
    a: "ได้ทุกเครื่อง! RGB789 รองรับทั้ง iOS และ Android ไม่ต้องดาวน์โหลดแอป เล่นผ่านเบราว์เซอร์ได้เลย ภาพสวยงาม โหลดเร็ว",
  },
];

export default function DemoSlot() {
  const [activeProvider, setActiveProvider] = useState("ทั้งหมด");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredGames = activeProvider === "ทั้งหมด"
    ? DEMO_GAMES
    : DEMO_GAMES.filter((g) => g.provider === activeProvider);

  useSEO({
    title: "ทดลองเล่นสล็อตฟรี | RGB789 สล็อตทดลองเล่น 1,000+ เกม ไม่ต้องสมัคร",
    description: "ทดลองเล่นสล็อตฟรีทุกค่ายดังที่ RGB789 PG Soft, Pragmatic Play, Joker Gaming ไม่ต้องสมัครสมาชิก ไม่ต้องฝากเงิน เล่นได้ทันที สล็อตทดลองเล่นไม่มีขั้นต่ำฟรีทุกวัน",
    keywords: "ทดลองเล่นสล็อต, สล็อตทดลองเล่น, สล็อตฟรี, ทดลองเล่นสล็อตฟรี, PG Soft ทดลอง, สล็อตไม่ต้องสมัคร, เล่นสล็อตฟรี, RGB789 ทดลอง",
    canonical: "https://rgb789.fun/demo-slot",
    ogType: "website",
    ogImage: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0225 0%, #1a0533 10%, #0f0225 100%)" }}
    >
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "ทดลองเล่นสล็อตฟรี ไม่ต้องสมัคร ทุกค่ายดัง | RGB789",
            description: "ทดลองเล่นสล็อตฟรีกว่า 1,000 เกม จาก PG Soft, Pragmatic Play, Joker Gaming ไม่ต้องสมัครสมาชิก ไม่ต้องฝากเงิน เล่นได้ทันที",
            url: "https://rgb789.fun/demo-slot",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "หน้าหลัก", item: "https://rgb789.fun" },
                { "@type": "ListItem", position: 2, name: "ทดลองเล่นสล็อต", item: "https://rgb789.fun/demo-slot" },
              ],
            },
          }),
        }}
      />

      <Suspense fallback={<div className="h-16" />}>
        <Header />
      </Suspense>

      <main className="pb-20 lg:pb-0">
        {/* Hero Section */}
        <section
          className="relative py-12 lg:py-20 text-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 50%, #1a0533 100%)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,215,0,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="container relative z-10">
            {/* Breadcrumb */}
            <div className="flex justify-center mb-6">
              <Breadcrumb items={[
                { label: "ทดลองเล่นสล็อต", href: "/demo-slot" },
              ]} />
            </div>

            <h1
              className="text-3xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span style={{ background: "linear-gradient(135deg, #FFD700, #FFC107)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ทดลองเล่นสล็อตฟรี
              </span>
              <br />
              <span className="text-white text-2xl lg:text-3xl font-medium">
                ไม่ต้องสมัคร ไม่ต้องฝากเงิน เล่นได้ทันที
              </span>
            </h1>
            <p
              className="text-base lg:text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Noto Sans Thai', sans-serif" }}
            >
              รวมสล็อตทดลองเล่นฟรีกว่า <strong style={{ color: "#FFD700" }}>1,000 เกม</strong> จากทุกค่ายดัง
              PG Soft, Pragmatic Play, Joker Gaming และอีกมากมาย
              ฝึกฝนกลยุทธ์ก่อนเล่นจริง ไม่มีความเสี่ยง
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-12 mb-8">
              {[
                { value: "1,000+", label: "เกมทดลองเล่น" },
                { value: "6+", label: "ค่ายเกมดัง" },
                { value: "ฟรี 100%", label: "ไม่ต้องฝาก" },
                { value: "24/7", label: "เล่นได้ตลอด" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRegisterClick("demo-slot-hero", "สมัครเล่นจริง รับโบนัส")}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                  color: "#1a0533",
                  fontFamily: "'Kanit', sans-serif",
                  boxShadow: "0 4px 20px rgba(255,215,0,0.4)",
                }}
              >
                🎰 สมัครเล่นจริง รับโบนัส
              </a>
              <a
                href="#demo-games"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg border"
                style={{
                  borderColor: "rgba(255,215,0,0.5)",
                  color: "#FFD700",
                  fontFamily: "'Kanit', sans-serif",
                }}
              >
                🎮 ดูเกมทดลองเล่น
              </a>
            </div>
          </div>
        </section>

        {/* Provider Filter */}
        <section className="py-8 sticky top-0 z-20" style={{ background: "rgba(15,2,37,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,215,0,0.1)" }}>
          <div className="container">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {PROVIDER_FILTERS.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProvider(p)}
                  className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all"
                  style={
                    activeProvider === p
                      ? { background: "linear-gradient(135deg, #FFD700, #FF8C00)", color: "#1a0533", fontFamily: "'Kanit', sans-serif" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "'Kanit', sans-serif" }
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Game Grid */}
        <section id="demo-games" className="py-12">
          <div className="container">
            <h2
              className="text-2xl lg:text-3xl font-bold mb-8"
              style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
            >
              สล็อตทดลองเล่นฟรี {activeProvider !== "ทั้งหมด" ? `— ${activeProvider}` : "ทุกค่าย"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="rounded-xl overflow-hidden group cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {/* Game Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={game.image}
                      alt={`ทดลองเล่น ${game.name} ฟรี`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Tag */}
                    <span
                      className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold"
                      style={{ background: game.tagColor, color: "#fff", fontFamily: "'Kanit', sans-serif" }}
                    >
                      {game.tag}
                    </span>
                    {/* Hover Overlay */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(15,2,37,0.85)" }}
                    >
                      <a
                        href={SITE_INFO.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackPlayGameClick(game.name, "demo-slot-game-preview")}
                        className="px-4 py-2 rounded-full text-sm font-bold"
                        style={{ background: "linear-gradient(135deg, #FFD700, #FF8C00)", color: "#1a0533", fontFamily: "'Kanit', sans-serif" }}
                      >
                        🎮 ทดลองเล่นฟรี
                      </a>
                      <a
                        href={SITE_INFO.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackRegisterClick("demo-slot-game-card", `เล่นจริง ${game.name}`)}
                        className="px-4 py-2 rounded-full text-sm font-bold border"
                        style={{ borderColor: "rgba(255,215,0,0.5)", color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
                      >
                        💰 เล่นจริง
                      </a>
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="p-3">
                    <h3
                      className="font-bold text-sm mb-1 truncate"
                      style={{ color: "#fff", fontFamily: "'Kanit', sans-serif" }}
                    >
                      {game.name}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>{game.provider}</p>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#FFD700" }}>RTP {game.rtp}</span>
                      <span style={{ color: "rgba(255,255,255,0.5)" }}>เดิมพันขั้นต่ำ {game.minBet}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More CTA */}
            <div className="text-center mt-10">
              <p className="mb-4" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                มีเกมสล็อตทดลองเล่นอีกกว่า 1,000 เกม สมัครสมาชิกเพื่อเข้าถึงทุกเกม
              </p>
              <a
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRegisterClick("demo-slot-load-more", "สมัครฟรี เล่นได้ทุกเกม")}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                  color: "#1a0533",
                  fontFamily: "'Kanit', sans-serif",
                  boxShadow: "0 4px 20px rgba(255,215,0,0.35)",
                }}
              >
                สมัครฟรี เล่นได้ทุกเกม →
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content — วิธีทดลองเล่นสล็อต */}
        <section className="py-12" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="container max-w-4xl">
            <h2
              className="text-2xl lg:text-3xl font-bold mb-6"
              style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
            >
              วิธีทดลองเล่นสล็อตฟรีที่ RGB789
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { step: "01", title: "เลือกเกมที่ชอบ", desc: "เลือกจากรายการเกมสล็อตกว่า 1,000 เกม กรองตามค่าย หรือค้นหาชื่อเกมได้เลย", icon: "🎯" },
                { step: "02", title: "กดทดลองเล่นฟรี", desc: "คลิกปุ่ม 'ทดลองเล่นฟรี' ระบบจะให้เครดิตสมมติ ไม่ต้องสมัครสมาชิก", icon: "🎮" },
                { step: "03", title: "ฝึกกลยุทธ์ก่อนเล่นจริง", desc: "ทำความเข้าใจ payline, ฟีเจอร์โบนัส และ RTP ก่อนเดิมพันด้วยเงินจริง", icon: "📊" },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-6 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>{s.step}</div>
                  <h3 className="font-bold mb-2 text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Noto Sans Thai', sans-serif" }}>{s.desc}</p>
                </div>
              ))}
            </div>

            {/* SEO Article */}
            <article style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Noto Sans Thai', sans-serif", lineHeight: "1.8" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>
                ทำไมต้องทดลองเล่นสล็อตก่อน?
              </h2>
              <p className="mb-4">
                การ<strong style={{ color: "#FFD700" }}>ทดลองเล่นสล็อต</strong>ฟรีเป็นวิธีที่ดีที่สุดสำหรับผู้เริ่มต้นและนักพนันมืออาชีพ
                เพราะช่วยให้คุณเข้าใจกลไกของเกม วิธีทำงานของ payline และฟีเจอร์โบนัสต่างๆ
                โดยไม่มีความเสี่ยงทางการเงินใดๆ
              </p>
              <p className="mb-4">
                <strong style={{ color: "#FFD700" }}>สล็อตทดลองเล่นฟรี</strong>ที่ RGB789 ใช้ระบบเดียวกับเกมจริงทุกประการ
                ทั้ง RTP (อัตราการจ่ายเงินคืน), ความถี่ในการออกโบนัส และฟีเจอร์พิเศษต่างๆ
                ทำให้คุณสามารถฝึกฝนและพัฒนากลยุทธ์ได้อย่างมีประสิทธิภาพ
              </p>

              <h2 className="text-xl font-bold mb-4 mt-8" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>
                สล็อตค่ายไหนน่าทดลองเล่นที่สุด?
              </h2>
              <p className="mb-4">
                <strong style={{ color: "#FFD700" }}>PG Soft</strong> เป็นค่ายที่ได้รับความนิยมสูงสุดในไทย
                โดยเฉพาะ Mahjong Ways ที่มี RTP 96.95% และโบนัสแตกบ่อย
                ตามด้วย <strong style={{ color: "#FFD700" }}>Pragmatic Play</strong> ที่มี Gates of Olympus
                เกมสล็อตระดับตำนานที่นักพนันทั่วโลกชื่นชอบ
              </p>
              <p className="mb-4">
                สำหรับผู้ที่ต้องการ RTP สูงสุด <strong style={{ color: "#FFD700" }}>JILI</strong> มีเกม Boxing King
                ที่ RTP สูงถึง 97.10% เหมาะสำหรับการเล่นระยะยาว
                ส่วน <strong style={{ color: "#FFD700" }}>Joker Gaming</strong> มีเกม Roma ที่เป็นที่รู้จักกันดีในหมู่นักพนันไทย
              </p>
            </article>
          </div>
        </section>

        {/* Providers Section */}
        <section className="py-12">
          <div className="container">
            <h2
              className="text-2xl font-bold text-center mb-8"
              style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
            >
              ค่ายเกมสล็อตชั้นนำที่ให้ทดลองเล่นฟรี
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {SLOT_PROVIDERS.map((provider) => (
                <div
                  key={provider}
                  className="px-6 py-3 rounded-full font-medium"
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    border: "1px solid rgba(255,215,0,0.3)",
                    color: "#FFD700",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {provider}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="container max-w-3xl">
            <h2
              className="text-2xl lg:text-3xl font-bold text-center mb-8"
              style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
            >
              คำถามที่พบบ่อย — ทดลองเล่นสล็อต
            </h2>
            <div className="space-y-3">
              {FAQ_DEMO.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,215,0,0.15)" }}
                >
                  <button
                    className="w-full text-left px-6 py-4 flex justify-between items-center"
                    style={{
                      background: openFaq === i ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.04)",
                      color: "#fff",
                      fontFamily: "'Kanit', sans-serif",
                    }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-medium pr-4">{item.q}</span>
                    <span style={{ color: "#FFD700", flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-6 py-4"
                      style={{
                        background: "rgba(255,215,0,0.05)",
                        color: "rgba(255,255,255,0.8)",
                        fontFamily: "'Noto Sans Thai', sans-serif",
                        lineHeight: "1.7",
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="py-16 text-center"
          style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 50%, #1a0533 100%)" }}
        >
          <div className="container">
            <h2
              className="text-2xl lg:text-3xl font-bold mb-4"
              style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
            >
              พร้อมเล่นจริงแล้วใช่ไหม?
            </h2>
            <p className="mb-8 text-lg" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
              สมัครสมาชิก RGB789 วันนี้ รับโบนัสต้อนรับสมาชิกใหม่ทันที
            </p>
            <a
              href={SITE_INFO.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRegisterClick("demo-slot-final", "สมัครสมาชิกฟรี รับโบนัสทันที")}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-xl"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                color: "#1a0533",
                fontFamily: "'Kanit', sans-serif",
                boxShadow: "0 6px 30px rgba(255,215,0,0.5)",
              }}
            >
              🎰 สมัครสมาชิกฟรี รับโบนัสทันที
            </a>
          </div>
        </section>
      </main>

      {/* Internal Links Section — SEO */}
      <section className="py-12" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,215,0,0.1)" }}>
        <div className="container">
          <h2
            className="text-xl lg:text-2xl font-bold mb-6 text-center"
            style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}
          >
            เนื้อหาที่เกี่ยวข้อง
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Link → Promotions */}
            <Link href="/promotions">
              <div
                className="rounded-2xl p-5 cursor-pointer group transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)" }}
              >
                <div className="text-2xl mb-3">🎁</div>
                <h3 className="font-bold mb-1" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>
                  โปรโมชั่นสล็อต
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                  รับโบนัสสมาชิกใหม่ ฝาก100รับ200 เครดิตฟรี คืนยอดเสีย 7%
                </p>
                <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#FFD700" }}>ดูโปรโมชั่นทั้งหมด →</span>
              </div>
            </Link>
            {/* Link → Articles (slot tips) */}
            <Link href="/articles">
              <div
                className="rounded-2xl p-5 cursor-pointer group transition-all hover:scale-[1.02]"
                style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}
              >
                <div className="text-2xl mb-3">📖</div>
                <h3 className="font-bold mb-1" style={{ color: "#A78BFA", fontFamily: "'Kanit', sans-serif" }}>
                  เทคนิคเล่นสล็อต
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                  คู่มือสล็อตมือใหม่ เทคนิคเพิ่มโอกาสชนะ รีวิว PG Soft
                </p>
                <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#A78BFA" }}>อ่านบทความสล็อต →</span>
              </div>
            </Link>
            {/* Link → Home */}
            <Link href="/">
              <div
                className="rounded-2xl p-5 cursor-pointer group transition-all hover:scale-[1.02]"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <div className="text-2xl mb-3">🏠</div>
                <h3 className="font-bold mb-1" style={{ color: "#34D399", fontFamily: "'Kanit', sans-serif" }}>
                  หน้าหลัก RGB789
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                  คาสิโนออนไลน์ สล็อตเว็บตรง บาคาร่า แทงบอล ฝากถอนออโต้
                </p>
                <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#34D399" }}>ไปหน้าหลัก →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-16" />}>
        <Footer />
      </Suspense>
      <BottomNavBar />
      <LineFloatingButton />
    </div>
  );
}
