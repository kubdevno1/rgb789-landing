// SEO: หน้า สล็อต789 — keyword volume 12,100/เดือน, competition 0.05 (SEMrush Thailand)
// Target keywords: สล็อต789, สล็อตเว็บตรง, สล็อต789เว็บตรง, สล็อตออนไลน์
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import StickyPromoBar from "@/components/StickyPromoBar";
import Breadcrumb from "@/components/Breadcrumb";
import { useSEO } from "@/hooks/useSEO";
import { SITE_INFO } from "@/lib/constants";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR";

const GAME_HIGHLIGHTS = [
  {
    name: "Mahjong Ways",
    provider: "PG Soft",
    description: "เกมสล็อตธีมไพ่นกกระจอกที่ได้รับความนิยมจากผู้เล่นไทย",
    tag: "ยอดนิยม",
  },
  {
    name: "Fortune Tiger",
    provider: "PG Soft",
    description: "เกมธีมเสือทอง เล่นง่าย เหมาะสำหรับเริ่มต้นสำรวจสล็อต789",
    tag: "เล่นง่าย",
  },
  {
    name: "Gates of Olympus",
    provider: "Pragmatic Play",
    description: "สล็อตธีมเทพเจ้ากรีก พร้อมรูปแบบโบนัสที่โดดเด่น",
    tag: "โบนัสเด่น",
  },
  {
    name: "Sweet Bonanza",
    provider: "Pragmatic Play",
    description: "สล็อตธีมลูกอมสีสันสดใส อีกหนึ่งเกมยอดนิยมของผู้เล่น",
    tag: "แนะนำ",
  },
] as const;

const BENEFITS = [
  { icon: "⚡", title: "สมัครผ่าน LINE ง่าย", description: "ติดต่อทีมงานผ่าน LINE ทางการเพื่อเริ่มต้นใช้งาน" },
  { icon: "🎮", title: "มีโหมดทดลองเล่น", description: "ศึกษารูปแบบเกมก่อนตัดสินใจเล่นด้วยเงินจริง" },
  { icon: "🎁", title: "รวมโปรโมชั่น", description: "ตรวจสอบโบนัสสมาชิกใหม่และข้อเสนอปัจจุบันได้ในหน้าโปรโมชั่น" },
  { icon: "📱", title: "รองรับมือถือ", description: "ใช้งานผ่านเบราว์เซอร์บนมือถือและคอมพิวเตอร์ได้สะดวก" },
] as const;

const FAQ_ITEMS = [
  {
    q: "สล็อต789 คืออะไร?",
    a: "สล็อต789 คือคำค้นหาที่ผู้เล่นใช้มองหาเกมสล็อตออนไลน์และเกมยอดนิยมจากค่ายต่าง ๆ โดยหน้า RGB789 นี้รวบรวมข้อมูลเกม แนวทางเริ่มต้น และช่องทางไปยังหน้าทดลองเล่นกับโปรโมชั่นที่เกี่ยวข้องไว้ในที่เดียว",
  },
  {
    q: "เล่นสล็อต789 บนมือถือได้ไหม?",
    a: "ได้ เว็บไซต์ RGB789 ออกแบบให้ใช้งานผ่านเบราว์เซอร์บนมือถือและคอมพิวเตอร์ได้ เพื่อให้เลือกดูเกม โปรโมชั่น และติดต่อทีมงานได้สะดวก",
  },
  {
    q: "อยากทดลองเล่นสล็อตก่อนต้องทำอย่างไร?",
    a: "ไปที่หน้าทดลองเล่นสล็อตของ RGB789 เพื่อดูเกมตัวอย่างและข้อมูลเบื้องต้นก่อนตัดสินใจเล่นจริง",
  },
  {
    q: "สล็อต789 มีโปรโมชั่นอะไรบ้าง?",
    a: "สามารถตรวจสอบรายการโบนัสสมาชิกใหม่ เครดิตพิเศษ และเงื่อนไขล่าสุดได้ที่หน้าโปรโมชั่น โดยควรอ่านรายละเอียดของแต่ละรายการก่อนเข้าร่วมทุกครั้ง",
  },
] as const;

export default function Slot789Page() {
  useSEO({
    title: "สล็อต789 | สล็อตเว็บตรง RGB789 เกมยอดนิยม สมัครง่ายผ่าน LINE",
    description: "สล็อต789 ที่ RGB789 รวมเกมสล็อตออนไลน์ยอดนิยม พร้อมหน้าทดลองเล่นสล็อต โปรโมชั่นสมาชิกใหม่ และบริการผ่าน LINE ใช้งานสะดวกบนมือถือ",
    keywords: "สล็อต789, สล็อต 789, สล็อต789เว็บตรง, สล็อตเว็บตรง, สล็อตออนไลน์, สล็อตมือถือ, RGB789 สล็อต",
    canonical: "https://rgb789.me/slot789",
    ogTitle: "สล็อต789 | สล็อตเว็บตรง RGB789 เกมยอดนิยม",
    ogDescription: "รวมข้อมูลสล็อต789 เกมยอดนิยม ทดลองเล่นสล็อต และโปรโมชั่นที่ RGB789",
    ogImage: `${CDN}/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp`,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "สล็อต789 | สล็อตเว็บตรง RGB789",
    description: "หน้าแนะนำสล็อต789 ที่รวมเกมยอดนิยม หน้าทดลองเล่นสล็อต และโปรโมชั่นของ RGB789",
    url: "https://rgb789.me/slot789",
    inLanguage: "th-TH",
    publisher: {
      "@type": "Organization",
      name: "RGB789",
      url: "https://rgb789.me",
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0f0225 0%, #1a0533 10%, #0f0225 100%)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <StickyPromoBar />
      <Header />
      <LineFloatingButton />

      <main className="pb-20 lg:pb-0">
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24" style={{ background: "linear-gradient(135deg, #18042f 0%, #311066 50%, #100321 100%)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 65% 72% at 85% 10%, rgba(255,215,0,0.14), transparent 66%), radial-gradient(ellipse 55% 70% at 10% 90%, rgba(139,92,246,0.26), transparent 70%)" }} />
          <div className="container relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-7">
                <Breadcrumb items={[{ label: "สล็อต789", href: "/slot789" }]} />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide" style={{ color: "#FFD700", borderColor: "rgba(255,215,0,0.35)", background: "rgba(255,215,0,0.08)", fontFamily: "'Kanit', sans-serif" }}>
                <span>✦</span> สล็อต789 เว็บรวมเกมยอดนิยม
              </div>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Kanit', sans-serif" }}>
                <span style={{ background: "linear-gradient(135deg, #FFE66D 0%, #FFD700 45%, #F59E0B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>สล็อต789</span>
                <br />
                <span className="text-white">สนุกกับสล็อตออนไลน์</span>
                <span className="text-violet-300"> ในที่เดียว</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg" style={{ fontFamily: "'Noto Sans Thai', sans-serif" }}>
                เลือกดูเกม<strong className="text-yellow-300">สล็อต789</strong>ยอดนิยม พร้อมข้อมูลสำหรับผู้เริ่มต้น หน้าทดลองเล่นสล็อต และโปรโมชั่นจาก RGB789 เพื่อประกอบการตัดสินใจอย่างรอบคอบ
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={SITE_INFO.registerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-bold transition-transform hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, #FFD700, #F59E0B)", color: "#18042f", fontFamily: "'Kanit', sans-serif", boxShadow: "0 8px 28px rgba(255,215,0,0.28)" }}>
                  สมัครผ่าน LINE
                </a>
                <Link href="/demo-slot" className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-base font-bold text-yellow-300 transition-colors hover:bg-yellow-300/10" style={{ borderColor: "rgba(255,215,0,0.45)", fontFamily: "'Kanit', sans-serif" }}>
                  ทดลองเล่นสล็อตฟรี →
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-6 rounded-[2.5rem] blur-3xl" style={{ background: "rgba(126,34,206,0.34)" }} />
              <div className="relative overflow-hidden rounded-[2rem] border p-3" style={{ background: "linear-gradient(145deg, rgba(255,215,0,0.14), rgba(33,8,72,0.78))", borderColor: "rgba(255,215,0,0.35)", boxShadow: "0 24px 70px rgba(0,0,0,0.35)" }}>
                <img src={`${CDN}/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp`} alt="เกมสล็อตออนไลน์ สล็อต789 RGB789" className="aspect-[4/3] w-full rounded-[1.4rem] object-cover" />
                <div className="absolute inset-x-7 bottom-7 rounded-2xl border p-4 backdrop-blur-md" style={{ background: "rgba(15,2,37,0.74)", borderColor: "rgba(255,215,0,0.24)" }}>
                  <p className="text-sm font-bold text-yellow-300" style={{ fontFamily: "'Kanit', sans-serif" }}>เริ่มต้นสำรวจเกมได้อย่างมั่นใจ</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">ทดลองดูรูปแบบเกมและอ่านรายละเอียดโปรโมชั่นก่อนเล่นจริงทุกครั้ง</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">RGB789 Selection</p>
              <h2 className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>เกมสล็อต789ที่ผู้เล่นค้นหาบ่อย</h2>
              <p className="mt-3 text-sm text-white/55">ตัวอย่างเกมจากค่ายยอดนิยมสำหรับใช้ศึกษาแนวเกมและฟีเจอร์ก่อนเริ่มเล่น</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {GAME_HIGHLIGHTS.map((game, index) => (
                <article key={game.name} className="group overflow-hidden rounded-2xl border transition-transform hover:-translate-y-1" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))", borderColor: "rgba(139,92,246,0.28)" }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={`${CDN}/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp`} alt={`${game.name} สล็อต789 ${game.provider}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: index % 2 === 0 ? "#FFD700" : "#A78BFA", color: "#18042f", fontFamily: "'Kanit', sans-serif" }}>{game.tag}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-violet-300">{game.provider}</p>
                    <h3 className="mt-1 text-lg font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>{game.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{game.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16" style={{ background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(139,92,246,0.16)", borderBottom: "1px solid rgba(139,92,246,0.16)" }}>
          <div className="container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>ทำไมคนค้นหา <span className="text-yellow-300">สล็อต789</span> ที่ RGB789</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border p-6 text-center" style={{ background: "rgba(15,2,37,0.45)", borderColor: "rgba(255,215,0,0.14)" }}>
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)" }}>{benefit.icon}</div>
                  <h3 className="mt-4 text-lg font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="container max-w-4xl">
            <article className="rounded-3xl border p-6 sm:p-10" style={{ background: "linear-gradient(145deg, rgba(49,16,102,0.42), rgba(15,2,37,0.7))", borderColor: "rgba(139,92,246,0.3)" }}>
              <p className="text-sm font-semibold tracking-wide text-yellow-300">คู่มือสล็อตออนไลน์</p>
              <h2 className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>สล็อต789 คืออะไร และเริ่มต้นอย่างไร</h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-white/70">
                <p><strong className="text-white">สล็อต789</strong> เป็นคำค้นหาที่สะท้อนความต้องการของผู้เล่นที่ต้องการเลือกดูเกมสล็อตออนไลน์จากหลายค่ายในจุดเดียว สำหรับผู้เริ่มต้น ควรเริ่มจากการทำความเข้าใจธีมเกม ตารางจ่ายเงิน ระบบโบนัส และเงื่อนไขที่แสดงอยู่ในเกมก่อนเสมอ</p>
                <p>การเริ่มด้วยหน้า <Link href="/demo-slot" className="font-semibold text-yellow-300 underline decoration-yellow-300/40 underline-offset-4">ทดลองเล่นสล็อตฟรี</Link> ช่วยให้เรียนรู้จังหวะและรูปแบบของเกมได้โดยไม่ต้องรีบตัดสินใจ เมื่อพร้อมแล้วจึงตรวจสอบ <Link href="/promotions" className="font-semibold text-yellow-300 underline decoration-yellow-300/40 underline-offset-4">โปรโมชั่นล่าสุด</Link> และรายละเอียดเงื่อนไขกับทีมงานผ่าน LINE ทางการ</p>
                <p>ควรกำหนดงบประมาณที่ยอมรับได้และเล่นอย่างมีความรับผิดชอบ ผลลัพธ์ของเกมขึ้นอยู่กับโอกาสและการสุ่ม จึงไม่ควรมองเป็นช่องทางสร้างรายได้หรือไล่ตามผลการเล่นที่ผ่านมา</p>
              </div>
            </article>
          </div>
        </section>

        <section className="py-12" style={{ background: "rgba(255,255,255,0.025)" }}>
          <div className="container max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>คำถามที่พบบ่อยเกี่ยวกับ<span className="text-yellow-300">สล็อต789</span></h2>
            <div className="mt-8 space-y-4">
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="rounded-2xl border p-5" style={{ background: "rgba(15,2,37,0.58)", borderColor: "rgba(255,215,0,0.16)" }}>
                  <h3 className="font-bold text-yellow-300" style={{ fontFamily: "'Kanit', sans-serif" }}>Q: {item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">A: {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container max-w-5xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>เนื้อหาที่เกี่ยวข้อง</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link href="/demo-slot" className="rounded-2xl border p-5 transition-transform hover:-translate-y-1" style={{ background: "rgba(255,215,0,0.06)", borderColor: "rgba(255,215,0,0.22)" }}>
                <span className="text-2xl">🎮</span><h3 className="mt-3 font-bold text-yellow-300" style={{ fontFamily: "'Kanit', sans-serif" }}>ทดลองเล่นสล็อตฟรี</h3><p className="mt-1 text-sm text-white/55">ดูสล็อตทดลองเล่นก่อนเริ่มเล่นจริง</p>
              </Link>
              <Link href="/free-credit" className="rounded-2xl border p-5 transition-transform hover:-translate-y-1" style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.22)" }}>
                <span className="text-2xl">🎁</span><h3 className="mt-3 font-bold text-emerald-300" style={{ fontFamily: "'Kanit', sans-serif" }}>เครดิตฟรีและโบนัส</h3><p className="mt-1 text-sm text-white/55">ตรวจสอบสิทธิประโยชน์สำหรับสมาชิก</p>
              </Link>
              <Link href="/articles" className="rounded-2xl border p-5 transition-transform hover:-translate-y-1" style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.28)" }}>
                <span className="text-2xl">📚</span><h3 className="mt-3 font-bold text-violet-300" style={{ fontFamily: "'Kanit', sans-serif" }}>บทความและเทคนิค</h3><p className="mt-1 text-sm text-white/55">อ่านบทความเกี่ยวกับสล็อตและเกมคาสิโน</p>
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
