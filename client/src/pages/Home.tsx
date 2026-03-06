// Design: Electric Stadium — RGB789 Landing Page
// SEO: Comprehensive landing page with structured content
// Colors: Deep Purple Gradient + Vivid Gold + Electric accents

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import PromoBanner from "@/components/PromoBanner";
import StepsSection from "@/components/StepsSection";
import GameCategories from "@/components/GameCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import PaymentMethods from "@/components/PaymentMethods";
import FAQSection from "@/components/FAQSection";
import ArticlesSection from "@/components/ArticlesSection";
import SEOContent from "@/components/SEOContent";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";

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
            url: "https://www.rgb789.com",
            description: "RGB789 เว็บพนันออนไลน์ครบวงจร คาสิโนสด สล็อต แทงบอล เกมยิงปลา รวมค่ายดังทั่วโลก",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.rgb789.com/search?q={search_term_string}",
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

      <Header />
      <main>
        <HeroSection />
        <MarqueeBar />
        <PromoBanner />
        <StepsSection />
        <GameCategories />
        <WhyChooseUs />
        <PaymentMethods />
        <FAQSection />
        <ArticlesSection />
        <SEOContent />
        <CTABanner />
      </main>
      <Footer />
      <BottomNavBar />
      <LineFloatingButton />
    </div>
  );
}
