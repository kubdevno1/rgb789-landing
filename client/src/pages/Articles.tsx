// Design: Electric Stadium — RGB789 Articles Page
// SEO: All articles in one place with grid layout

import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, Clock, ChevronLeft, Search, Star, TrendingUp, Sparkles, Dice1, Trophy, Target, Tv, Share2, X, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import { SITE_INFO } from "@/lib/constants";
import { useSEO } from "@/hooks/useSEO";
import Breadcrumb from "@/components/Breadcrumb";

type TabKey = "all" | "slots" | "casino" | "sports";

const TABS: { key: TabKey; label: string; count: number }[] = [
  { key: "all", label: "ทั้งหมด", count: 9 },
  { key: "slots", label: "สล็อต", count: 4 },
  { key: "casino", label: "คาสิโนสด", count: 2 },
  { key: "sports", label: "แทงบอล", count: 3 },
];

const ARTICLES = [
  {
    id: "slot-guide",
    category: "slots",
    title: "คู่มือเล่นสล็อตออนไลน์ ฉบับมือใหม่ 2567",
    excerpt: "เรียนรู้วิธีเล่นสล็อตออนไลน์ตั้งแต่พื้นฐาน เทคนิคการเลือกเกม อัตรา RTP และวิธีบริหารเงินทุนอย่างมืออาชีพ",
    readTime: "8 นาที",
    icon: BookOpen,
    tag: "คู่มือ",
    tagColor: "#8B5CF6",
  },
  {
    id: "top-slot-games",
    category: "slots",
    title: "10 เกมสล็อตยอดนิยม แตกง่าย จ่ายจริง 2567",
    excerpt: "รวมเกมสล็อตที่ผู้เล่นนิยมมากที่สุด จากค่ายดัง PG Soft, Pragmatic Play, JILI พร้อมอัตรา RTP สูง",
    readTime: "6 นาที",
    icon: Star,
    tag: "แนะนำ",
    tagColor: "#F59E0B",
  },
  {
    id: "slot-tips",
    category: "slots",
    title: "เทคนิคเล่นสล็อตให้ได้กำไร สูตรที่มือโปรใช้จริง",
    excerpt: "เปิดเผยเทคนิคและกลยุทธ์การเล่นสล็อตที่นักเดิมพันมืออาชีพใช้ เพิ่มโอกาสชนะอย่างมีระบบ",
    readTime: "7 นาที",
    icon: TrendingUp,
    tag: "เทคนิค",
    tagColor: "#10B981",
  },
  {
    id: "pg-soft-review",
    category: "slots",
    title: "รีวิว PG Soft ค่ายสล็อตอันดับ 1 เกมแตกง่าย กราฟิกสวย",
    excerpt: "ทำความรู้จักค่าย PG Soft ผู้พัฒนาเกมสล็อตชั้นนำ พร้อมรีวิวเกมเด่นและเหตุผลที่ผู้เล่นเลือก",
    readTime: "5 นาที",
    icon: Sparkles,
    tag: "รีวิว",
    tagColor: "#EC4899",
  },
  {
    id: "casino-live-guide",
    category: "casino",
    title: "คาสิโนสดออนไลน์ คู่มือฉบับสมบูรณ์ เล่นอย่างไรให้ได้เงินจริง",
    excerpt: "เรียนรู้ทุกอย่างเกี่ยวกับคาสิโนสด ตั้งแต่วิธีเล่น เกมยอดนิยม เทคนิคการเดิมพัน และค่ายที่ดีที่สุดในปี 2567",
    readTime: "9 นาที",
    icon: Tv,
    tag: "คู่มือ",
    tagColor: "#8B5CF6",
  },
  {
    id: "baccarat-strategy",
    category: "casino",
    title: "สูตรบาคาร่า 2567 เทคนิคอ่านเค้าไพ่ที่มือโปรใช้จริง",
    excerpt: "เปิดเผยสูตรบาคาร่าและเทคนิคอ่านเค้าไพ่แบบมืออาชีพ พร้อมกลยุทธ์บริหารเงินทุนเพื่อเพิ่มโอกาสชนะ",
    readTime: "8 นาที",
    icon: Dice1,
    tag: "เทคนิค",
    tagColor: "#10B981",
  },
  {
    id: "football-betting-guide",
    category: "sports",
    title: "แทงบอลออนไลน์ คู่มือฉบับสมบูรณ์สำหรับมือใหม่ 2567",
    excerpt: "เรียนรู้วิธีแทงบอลออนไลน์ตั้งแต่พื้นฐาน ประเภทการเดิมพัน อ่านราคาบอล และเทคนิคเพิ่มโอกาสชนะ",
    readTime: "10 นาที",
    icon: Trophy,
    tag: "คู่มือ",
    tagColor: "#8B5CF6",
  },
  {
    id: "football-betting-tips",
    category: "sports",
    title: "เทคนิคแทงบอลให้ได้กำไร สูตรวิเคราะห์บอลแบบมืออาชีพ",
    excerpt: "เปิดเผยเทคนิควิเคราะห์บอลและกลยุทธ์การเดิมพันที่นักแทงบอลมืออาชีพใช้จริง เพิ่มโอกาสชนะอย่างมีระบบ",
    readTime: "8 นาที",
    icon: Target,
    tag: "เทคนิค",
    tagColor: "#10B981",
  },
  {
    id: "live-sports-betting",
    category: "sports",
    title: "แทงบอลสด (Live Betting) คู่มือและกลยุทธ์ที่ได้ผลจริง",
    excerpt: "เรียนรู้เทคนิคการแทงบอลสดอย่างมืออาชีพ จังหวะที่ดีที่สุดในการเดิมพัน และวิธีอ่านเกมสดให้แม่นยำ",
    readTime: "7 นาที",
    icon: Tv,
    tag: "เทคนิค",
    tagColor: "#10B981",
  },
];

const categoryBg: Record<string, string> = {
  slots: "rgba(139,92,246,0.15)",
  casino: "rgba(236,72,153,0.15)",
  sports: "rgba(16,185,129,0.15)",
};

const categoryLabel: Record<string, string> = {
  slots: "สล็อต",
  casino: "คาสิโนสด",
  sports: "แทงบอล",
};

export default function Articles() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<(typeof ARTICLES)[0] | null>(null);

  useSEO({
    title: "บทความ RGB789 | เทคนิคสล็อต สูตรบาคาร่า แทงบอลออนไลน์ 2567",
    description: "รวมบทความความรู้ RGB789 เทคนิคเล่นสล็อตออนไลน์ สูตรบาคาร่า 2567 รีวิวค่ายสล็อต PG Soft คู่มือแทงบอลออนไลน์ คาสิโนสด อ่านฟรีไม่มีค่าใช้จ่าย",
    keywords: "เทคนิคสล็อต, สูตรบาคาร่า, รีวิวสล็อต, PG Soft, คู่มือแทงบอล, คาสิโนสด, บทความสล็อต, RGB789 บทความ",
    canonical: "https://rgb789.me/articles",
    ogType: "website",
    ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo-full_e43066ad.jpg",
  });

  const filtered = ARTICLES.filter((a) => {
    const matchTab = activeTab === "all" || a.category === activeTab;
    const matchSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleShare = (article: (typeof ARTICLES)[0]) => {
    const url = `https://${SITE_INFO.domain}/articles`;
    const text = `${article.title} - อ่านบทความดีๆ ที่ ${SITE_INFO.name}`;
    if (navigator.share) {
      navigator.share({ title: article.title, text, url });
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0f0225 0%, #1a0533 10%, #0f0225 100%)" }}
    >
      <Header />

      <main className="pt-20 pb-24 lg:pb-16">
        {/* Hero */}
        <section className="py-10 lg:py-14 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.18) 0%, transparent 60%)",
            }}
          />
          <div className="container relative z-10 text-center">
            {/* Breadcrumb */}
            <div className="flex justify-center mb-6">
              <Breadcrumb items={[
                { label: "บทความ & ความรู้", href: "/articles" },
              ]} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5"
                style={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.08)" }}
              >
                <BookOpen size={14} className="text-purple-400" />
                <span className="text-xs font-medium text-purple-300 tracking-wider uppercase" style={{ fontFamily: "'Kanit', sans-serif" }}>
                  บทความ & ความรู้
                </span>
              </div>

              <h1
                className="text-3xl lg:text-5xl font-bold mb-4"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFC107, #FFE066)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  บทความทั้งหมด
                </span>
              </h1>
              <p className="text-white/50 max-w-xl mx-auto text-sm lg:text-base">
                รวมบทความความรู้เกี่ยวกับสล็อต คาสิโนสด แทงบอล เทคนิคการเล่น และรีวิวค่ายเกมชั้นนำ
              </p>
            </motion.div>

            {/* Search */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="ค้นหาบทความ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-purple-500"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {TABS.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, #7C3AED, #9333EA)"
                        : "rgba(255,255,255,0.05)",
                      color: active ? "#fff" : "rgba(255,255,255,0.5)",
                      border: active ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "'Kanit', sans-serif",
                    }}
                  >
                    {tab.label}
                    <span
                      className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                        color: active ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="container pb-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p>ไม่พบบทความที่ตรงกับการค้นหา</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((article, i) => {
                const Icon = article.icon;
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="rounded-2xl overflow-hidden cursor-pointer group"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onClick={() => setSelectedArticle(article)}
                  >
                    {/* Card top accent */}
                    <div
                      className="h-1.5 w-full"
                      style={{ background: `linear-gradient(90deg, ${article.tagColor}, transparent)` }}
                    />

                    <div className="p-5">
                      {/* Category + tag */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{
                            background: categoryBg[article.category] || "rgba(139,92,246,0.15)",
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "'Kanit', sans-serif",
                          }}
                        >
                          {categoryLabel[article.category]}
                        </span>
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            background: `${article.tagColor}22`,
                            color: article.tagColor,
                            border: `1px solid ${article.tagColor}44`,
                            fontFamily: "'Kanit', sans-serif",
                          }}
                        >
                          {article.tag}
                        </span>
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${article.tagColor}22` }}
                        >
                          <Icon size={16} style={{ color: article.tagColor }} />
                        </div>
                        <h2
                          className="text-sm font-bold text-white leading-snug group-hover:text-yellow-300 transition-colors line-clamp-2"
                          style={{ fontFamily: "'Kanit', sans-serif" }}
                        >
                          {article.title}
                        </h2>
                      </div>

                      {/* Excerpt */}
                      <p className="text-white/45 text-xs leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-white/30 text-xs">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleShare(article); }}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                            title="แชร์"
                          >
                            <Share2 size={13} className="text-white/30 hover:text-white/60" />
                          </button>
                          <span
                            className="text-xs font-medium flex items-center gap-1"
                            style={{ color: article.tagColor }}
                          >
                            อ่านต่อ <ExternalLink size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="container mt-6">
          <div
            className="rounded-2xl p-6 lg:p-8 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(147,51,234,0.15))",
              border: "1px solid rgba(139,92,246,0.3)",
            }}
          >
            <h3
              className="text-xl lg:text-2xl font-bold text-white mb-2"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              พร้อมลองเล่นแล้วใช่ไหม?
            </h3>
            <p className="text-white/50 text-sm mb-5">
              สมัครสมาชิก RGB789 วันนี้ รับโบนัสต้อนรับสมาชิกใหม่ทันที
            </p>
            <a
              href={SITE_INFO.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC107)",
                color: "#1a0533",
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              สมัครสมาชิกฟรี
            </a>
          </div>
        </section>
      </main>

      {/* Article Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{ background: "#1a0533", border: "1px solid rgba(139,92,246,0.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div
              className="sticky top-0 z-10 flex items-center justify-between p-4 border-b"
              style={{ background: "#1a0533", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: `${selectedArticle.tagColor}22`,
                    color: selectedArticle.tagColor,
                    border: `1px solid ${selectedArticle.tagColor}44`,
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  {selectedArticle.tag}
                </span>
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <Clock size={11} />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={18} className="text-white/50" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-5 lg:p-6">
              <h2
                className="text-xl lg:text-2xl font-bold text-white mb-4 leading-snug"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                {selectedArticle.title}
              </h2>
              <div
                className="text-white/65 text-sm leading-relaxed space-y-3"
                style={{ fontFamily: "'Kanit', sans-serif" }}
                dangerouslySetInnerHTML={{
                  __html: selectedArticle.excerpt + "<br/><br/>" +
                    "<em class='text-white/40 text-xs'>อ่านบทความฉบับเต็มได้ที่หน้าหลักในส่วนบทความแนะนำ</em>",
                }}
              />

              {/* CTA in modal */}
              <div className="mt-6 flex gap-3">
                <a
                  href={SITE_INFO.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #FFD700, #FFC107)",
                    color: "#1a0533",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  สมัครสมาชิกเลย
                </a>
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-4 py-3 rounded-xl font-medium text-sm transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Kanit', sans-serif",
                  }}
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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
            <Link href="/demo-slot">
              <div
                className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)" }}
              >
                <div className="text-2xl mb-3">🎮</div>
                <h3 className="font-bold mb-1" style={{ color: "#FFD700", fontFamily: "'Kanit', sans-serif" }}>
                  ทดลองเล่นสล็อตฟรี
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                  สล็อตทดลองเล่น 1,000+ เกม PG Soft, Pragmatic Play ไม่ต้องสมัคร
                </p>
                <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#FFD700" }}>ทดลองเล่นเลย →</span>
              </div>
            </Link>
            <Link href="/promotions">
              <div
                className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02]"
                style={{ background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.2)" }}
              >
                <div className="text-2xl mb-3">🎁</div>
                <h3 className="font-bold mb-1" style={{ color: "#F472B6", fontFamily: "'Kanit', sans-serif" }}>
                  โปรโมชั่นและโบนัส
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                  ฝาก100รับ200 เครดิตฟรี คืนยอดเสีย 7% ทุกวัน
                </p>
                <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#F472B6" }}>ดูโปรโมชั่น →</span>
              </div>
            </Link>
            <Link href="/">
              <div
                className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02]"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <div className="text-2xl mb-3">🏠</div>
                <h3 className="font-bold mb-1" style={{ color: "#34D399", fontFamily: "'Kanit', sans-serif" }}>
                  หน้าหลัก RGB789
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Noto Sans Thai', sans-serif" }}>
                  สล็อตออนไลน์ บาคาร่า แทงบอล เว็บตรงไม่ผ่านเอเย่นต์
                </p>
                <span className="inline-block mt-3 text-xs font-semibold" style={{ color: "#34D399" }}>ไปหน้าหลัก →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <LineFloatingButton />
      <BottomNavBar />
    </div>
  );
}
