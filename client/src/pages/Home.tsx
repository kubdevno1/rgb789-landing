// Design: Electric Stadium — RGB789 Landing Page
// SEO: Comprehensive landing page with structured content
// Colors: Deep Purple Gradient + Vivid Gold + Electric accents

import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import StickyPromoBar from "@/components/StickyPromoBar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import PromoBanner from "@/components/PromoBanner";
import StepsSection from "@/components/StepsSection";
import GameCategories from "@/components/GameCategories";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import Footer from "@/components/Footer";

// Lazy load non-critical components
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const PaymentMethods = lazy(() => import("@/components/PaymentMethods"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ArticlesSection = lazy(() => import("@/components/ArticlesSection"));
const SEOContent = lazy(() => import("@/components/SEOContent"));
const CTABanner = lazy(() => import("@/components/CTABanner"));
const PromotionsCarousel = lazy(() => import("@/components/PromotionsCarousel"));
const GameScreenshots = lazy(() => import("@/components/GameScreenshots"));

// Fallback component
const SectionFallback = () => <div className="h-32" />;

// Lazy loading wrapper
const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionFallback />}>
    {children}
  </Suspense>
);

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0f0225 0%, #1a0533 10%, #0f0225 100%)",
      }}
    >
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "RGB789",
            url: "https://rgb789.me",
            description: "RGB789 เว็บพนันออนไลน์อันดับ 1 สล็อตออนไลน์ บาคาร่าออนไลน์ คาสิโนสด เว็บตรงไม่ผ่านเอเย่นต์ สมาชิกใหม่ฝาก100รับ200 คืนยอดเสีย 7% ฝากถอนออโต้ไว ปลอดภัย 100%",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://rgb789.me/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "RGB789 คืออะไร?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RGB789 คือเว็บพนันออนไลน์ครบวงจรที่รวบรวมเกมคาสิโนจากทุกค่ายดังทั่วโลก ให้บริการทั้งคาสิโนสด สล็อตออนไลน์ แทงบอล เกมยิงปลา และโต๊ะเกม ในเว็บเดียว",
                },
              },
              {
                "@type": "Question",
                name: "สมัครสมาชิก RGB789 ยากไหม?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "สมัครสมาชิกง่ายมาก ใช้เวลาเพียง 3 นาที เพียงกรอกข้อมูลพื้นฐาน ยืนยันตัวตน และเริ่มเล่นได้ทันที",
                },
              },
              {
                "@type": "Question",
                name: "ฝาก-ถอนเงินใช้เวลานานไหม?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RGB789 ใช้ระบบฝาก-ถอนอัตโนมัติ (Auto) ฝากเงินภายใน 30 วินาที ถอนเงินภายใน 1-3 นาที รองรับทุกธนาคาร",
                },
              },
              {
                "@type": "Question",
                name: "RGB789 ปลอดภัยไหม?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "RGB789 ได้รับใบอนุญาตถูกต้องตามกฎหมาย มีระบบรักษาความปลอดภัย SSL Encryption ระดับสูงสุด",
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD Article Schema for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Article",
                  headline: "คู่มือเล่นสล็อตออนไลน์ ฉบับมือใหม่ 2567",
                  description: "เรียนรู้วิธีเล่นสล็อตออนไลน์ตั้งแต่พื้นฐาน เทคนิคการเลือกเกม อัตรา RTP และวิธีบริหารเงินทุนอย่างมืออาชีพ",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2024-12-01",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#slot-guide",
                  articleSection: "สล็อตออนไลน์",
                  keywords: ["สล็อตออนไลน์", "คู่มือสล็อต", "RTP", "วิธีเล่นสล็อต", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Article",
                  headline: "10 เกมสล็อตยอดนิยม แตกง่าย จ่ายจริง 2567",
                  description: "รวมเกมสล็อตที่ผู้เล่นนิยมมากที่สุด จากค่ายดัง PG Soft, Pragmatic Play, JILI พร้อมอัตรา RTP สูง",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2024-12-15",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#top-slot-games",
                  articleSection: "สล็อตออนไลน์",
                  keywords: ["เกมสล็อตยอดนิยม", "สล็อตแตกง่าย", "PG Soft", "Pragmatic Play", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Article",
                  headline: "เทคนิคเล่นสล็อตให้ได้กำไร สูตรที่มือโปรใช้จริง",
                  description: "เปิดเผยเทคนิคและกลยุทธ์การเล่นสล็อตที่นักเดิมพันมืออาชีพใช้ เพิ่มโอกาสชนะอย่างมีระบบ",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2025-01-10",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#slot-tips",
                  articleSection: "สล็อตออนไลน์",
                  keywords: ["เทคนิคสล็อต", "สูตรสล็อต", "เล่นสล็อตให้ได้กำไร", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Article",
                  headline: "รีวิว PG Soft ค่ายสล็อตอันดับ 1 เกมแตกง่าย กราฟิกสวย",
                  description: "ทำความรู้จักค่าย PG Soft ผู้พัฒนาเกมสล็อตชั้นนำ พร้อมรีวิวเกมเด่นและเหตุผลที่ผู้เล่นเลือก",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2025-01-20",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#pg-soft-review",
                  articleSection: "สล็อตออนไลน์",
                  keywords: ["PG Soft", "รีวิว PG Soft", "ค่ายสล็อต", "Mahjong Ways", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: {
                  "@type": "Article",
                  headline: "คาสิโนสดออนไลน์ คู่มือฉบับสมบูรณ์ เล่นอย่างไรให้ได้เงินจริง",
                  description: "เรียนรู้ทุกอย่างเกี่ยวกับคาสิโนสด ตั้งแต่วิธีเล่น เกมยอดนิยม เทคนิคการเดิมพัน และค่ายที่ดีที่สุดในปี 2567",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2025-02-01",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#casino-live-guide",
                  articleSection: "คาสิโนสด",
                  keywords: ["คาสิโนสด", "คาสิโนออนไลน์", "บาคาร่า", "SA Gaming", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 6,
                item: {
                  "@type": "Article",
                  headline: "สูตรบาคาร่า 2567 เทคนิคอ่านเค้าไพ่ที่มือโปรใช้จริง",
                  description: "เปิดเผยสูตรบาคาร่าและเทคนิคอ่านเค้าไพ่แบบมืออาชีพ พร้อมกลยุทธ์บริหารเงินทุนเพื่อเพิ่มโอกาสชนะ",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2025-02-10",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#baccarat-strategy",
                  articleSection: "คาสิโนสด",
                  keywords: ["สูตรบาคาร่า", "เทคนิคบาคาร่า", "เค้าไพ่", "บาคาร่าออนไลน์", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 7,
                item: {
                  "@type": "Article",
                  headline: "แทงบอลออนไลน์ คู่มือฉบับสมบูรณ์สำหรับมือใหม่ 2567",
                  description: "เรียนรู้วิธีแทงบอลออนไลน์ตั้งแต่พื้นฐาน ประเภทการเดิมพัน อ่านราคาบอล และเทคนิคเพิ่มโอกาสชนะ",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2025-02-15",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#football-betting-guide",
                  articleSection: "แทงบอล",
                  keywords: ["แทงบอลออนไลน์", "วิธีแทงบอล", "ราคาบอล", "SBOBET", "RGB789"],
                  inLanguage: "th",
                },
              },
              {
                "@type": "ListItem",
                position: 8,
                item: {
                  "@type": "Article",
                  headline: "เทคนิคแทงบอลให้ได้กำไร สูตรวิเคราะห์บอลแบบมืออาชีพ",
                  description: "เปิดเผยเทคนิควิเคราะห์บอลและกลยุทธ์การเดิมพันที่นักแทงบอลมืออาชีพใช้จริง เพิ่มโอกาสชนะอย่างมีระบบ",
                  author: { "@type": "Organization", name: "RGB789" },
                  publisher: {
                    "@type": "Organization",
                    name: "RGB789",
                    url: "https://rgb789.me",
                  },
                  datePublished: "2025-02-20",
                  dateModified: "2025-03-01",
                  mainEntityOfPage: "https://rgb789.me/#football-betting-tips",
                  articleSection: "แทงบอล",
                  keywords: ["เทคนิคแทงบอล", "วิเคราะห์บอล", "สูตรแทงบอล", "แทงบอลให้ได้กำไร", "RGB789"],
                  inLanguage: "th",
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RGB789",
            url: "https://rgb789.me",
            description: "RGB789 เว็บพนันออนไลน์ครบวงจร คาสิโนสด สล็อต แทงบอล เกมยิงปลา รวมค่ายดังทั่วโลก",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["Thai", "English"],
              url: "https://line.me/ti/p/@311ukzxq",
            },
            sameAs: ["https://line.me/ti/p/@311ukzxq"],
          }),
        }}
      />

      {/* JSON-LD BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "หน้าแรก",
                item: "https://rgb789.me",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "สล็อตออนไลน์",
                item: "https://rgb789.me/#slots",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "คาสิโนสด",
                item: "https://rgb789.me/#casino",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "แทงบอล",
                item: "https://rgb789.me/#sports",
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "บทความแนะนำ",
                item: "https://rgb789.me/#articles",
              },
            ],
          }),
        }}
      />

      <StickyPromoBar />
      <Header />
      <main>
        <HeroSection />
        <MarqueeBar />
        <PromoBanner />
        <StepsSection />
        <LazySection>
          <PromotionsCarousel />
        </LazySection>
        <GameCategories />
        <LazySection>
          <GameScreenshots />
        </LazySection>
        <LazySection>
          <WhyChooseUs />
        </LazySection>
        <LazySection>
          <PaymentMethods />
        </LazySection>
        <LazySection>
          <FAQSection />
        </LazySection>
        <LazySection>
          <ArticlesSection />
        </LazySection>
        <LazySection>
          <SEOContent />
        </LazySection>
        <LazySection>
          <CTABanner />
        </LazySection>
      </main>
      <LazySection>
        <Footer />
      </LazySection>
      <BottomNavBar />
      <LineFloatingButton />
    </div>
  );
}
