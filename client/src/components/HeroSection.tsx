// Design: Electric Stadium — Hero with stadium background, gold CTA
// SEO: H1 tag with primary keywords, descriptive text

import { IMAGES, SITE_INFO } from "@/lib/constants";
import { trackRegisterClick, trackLoginClick } from "@/lib/analytics";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero-banner.webp"
          alt="RGB789 คาสิโนสด เว็บพนันออนไลน์"
          className="w-full h-full object-cover"
          width="1440"
          height="804"
          sizes="100vw"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(15,2,37,0.3) 0%, rgba(15,2,37,0.2) 40%, rgba(15,2,37,0.5) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 lg:pt-32 pb-16">
        <div className="max-w-3xl">
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(139,92,246,0.15) 100%)",
                border: "1px solid rgba(255,215,0,0.3)",
                color: "#FFD700",
                fontFamily: "'Kanit', sans-serif",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              เปิดให้บริการ 24 ชั่วโมง
            </div>

            {/* H1 - SEO Primary */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span className="text-white">RGB789</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FFC107 40%, #FFE066 60%, #FFD700 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,215,0,0.3))",
                }}
              >
                คาสิโนออนไลน์
              </span>
              <br />
              <span className="text-white/90 text-3xl sm:text-4xl lg:text-5xl">
                เว็บพนันออนไลน์อันดับ 1
              </span>
            </h1>

            {/* Description - SEO */}
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">
              RGB789 เว็บพนันออนไลน์อันดับ 1 ครบวงจร ให้บริการคาสิโนออนไลน์ สล็อตออนไลน์ แทงบอล เกมยิงปลา และคาสิโนสดจากค่ายดังทั่วโลก SA Gaming, Sexy Gaming, PG Slot, Pretty Gaming สมัครง่าย ฝากถอนออโต้ รวดเร็วภายใน 30 วินาที พร้อมโปรโมชั่นดีๆ มากมาย
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRegisterClick("hero")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                  color: "#1a0533",
                  boxShadow: "0 0 30px rgba(255,215,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              >
                สมัครสมาชิก
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href={SITE_INFO.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLoginClick("hero")}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-white/10 text-white border"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  borderColor: "rgba(139,92,246,0.4)",
                  backdropFilter: "blur(8px)",
                  background: "rgba(139,92,246,0.1)",
                }}
              >
                เข้าสู่ระบบ
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t" style={{ borderColor: "rgba(139,92,246,0.2)" }}>
              {[
                { value: "50,000+", label: "สมาชิกที่ไว้วางใจ" },
                { value: "100+", label: "เกมให้เลือกเล่น" },
                { value: "30 วินาที", label: "ฝาก-ถอนออโต้" },
              ].map((stat, i) => (
                <div key={i}>
                  <div
                    className="text-xl sm:text-2xl lg:text-3xl font-bold"
                    style={{
                      fontFamily: "'Kanit', sans-serif",
                      background: "linear-gradient(135deg, #FFD700, #FFC107)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(15,2,37,1) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
