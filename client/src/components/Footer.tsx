// Design: Electric Stadium — Comprehensive footer with SEO links
// SEO: Internal links, sitemap-like structure

import { SITE_INFO, GAME_CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="relative pt-16 pb-24 lg:pb-8"
      style={{
        background: "linear-gradient(180deg, rgba(15,2,37,0.5) 0%, rgba(10,1,25,1) 100%)",
        borderTop: "1px solid rgba(139,92,246,0.15)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-block mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo_b0cfdfe9.jpg"
                alt="RGB789 - เว็บพนันออนไลน์อันดับ 1"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {SITE_INFO.tagline}
            </p>
            <p className="text-white/40 text-xs">
              ขอสงวนลิขสิทธิ์ 2567 ©
            </p>
          </div>

          {/* Game Categories */}
          <div>
            <h3
              className="text-sm font-bold text-white/90 mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              เกมทั้งหมด
            </h3>
            <ul className="space-y-2.5">
              {GAME_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="text-sm text-white/50 hover:text-yellow-400 transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-bold text-white/90 mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              ลิงก์ด่วน
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "สมัครสมาชิก", href: SITE_INFO.registerUrl },
                { label: "เข้าสู่ระบบ", href: SITE_INFO.loginUrl },
                { label: "โปรโมชั่น", href: "#promotions" },
                { label: "วิธีสมัคร", href: "#how-to" },
                { label: "คำถามที่พบบ่อย", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-white/50 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3
              className="text-sm font-bold text-white/90 mb-4 uppercase tracking-wider"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              ข้อมูล
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "เกี่ยวกับเรา", href: "#about" },
                { label: "ข้อตกลงและกติกา", href: "#" },
                { label: "นโยบายความเป็นส่วนตัว", href: "#" },
                { label: "วิธีการใช้งานเว็บไซต์", href: "#" },
                { label: "ติดต่อเรา (LINE)", href: SITE_INFO.lineUrl },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-white/50 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(139,92,246,0.1)" }}
        >
          <p className="text-xs text-white/30">
            © 2567 RGB789.COM สงวนลิขสิทธิ์ทุกประการ
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              ข้อตกลงและกติกา
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              นโยบายความเป็นส่วนตัว
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
