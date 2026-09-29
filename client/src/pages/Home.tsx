// Design: Electric Stadium — RGB789 Landing Page
// SEO: Comprehensive landing page with structured content
// Colors: Deep Purple Gradient + Vivid Gold + Electric accents

import Header from "@/components/Header";
import StickyPromoBar from "@/components/StickyPromoBar";
import HeroSection from "@/components/HeroSection";
import MarqueeBar from "@/components/MarqueeBar";
import BottomNavBar from "@/components/BottomNavBar";
import LineFloatingButton from "@/components/LineFloatingButton";
import PromoBanner from "@/components/PromoBanner";
import StepsSection from "@/components/StepsSection";
import GameCategories from "@/components/GameCategories";
import WhyChooseUs from "@/components/WhyChooseUs";
import PaymentMethods from "@/components/PaymentMethods";
import FAQSection from "@/components/FAQSection";
import ArticlesSection from "@/components/ArticlesSection";
import SEOContent from "@/components/SEOContent";
import CTABanner from "@/components/CTABanner";
import PromotionsCarousel from "@/components/PromotionsCarousel";
import GameScreenshots from "@/components/GameScreenshots";
import Footer from "@/components/Footer";

// Public landing-page sections are synchronously imported so prerendered HTML
// contains the same crawlable content that users see after hydration.
const DeferredSection = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
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
            url: "https://rgb789.fun",
            description: "เว็บไซต์ RGB789 รวมข้อมูลเกมสล็อต คาสิโนสด และช่องทางติดต่อบริการสำหรับผู้ใช้งานภาษาไทย",
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
            url: "https://rgb789.fun",
            description: "เว็บไซต์ RGB789 รวมข้อมูลบริการออนไลน์และช่องทางติดต่อสำหรับผู้ใช้งานภาษาไทย",
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

      <StickyPromoBar />
      <Header />
      <main>
        <HeroSection />
        <MarqueeBar />
        <DeferredSection>
          <PromoBanner />
        </DeferredSection>
        <DeferredSection>
          <StepsSection />
        </DeferredSection>
        <DeferredSection>
          <PromotionsCarousel />
        </DeferredSection>
        <DeferredSection>
          <GameCategories />
        </DeferredSection>
        <DeferredSection>
          <GameScreenshots />
        </DeferredSection>
        <DeferredSection>
          <WhyChooseUs />
        </DeferredSection>
        <DeferredSection>
          <PaymentMethods />
        </DeferredSection>
        <DeferredSection>
          <FAQSection />
        </DeferredSection>
        <DeferredSection>
          <ArticlesSection />
        </DeferredSection>
        <DeferredSection>
          <SEOContent />
        </DeferredSection>
        <DeferredSection>
          <CTABanner />
        </DeferredSection>
      </main>
      <DeferredSection>
        <Footer />
      </DeferredSection>
      <BottomNavBar />
      <LineFloatingButton />
    </div>
  );
}
