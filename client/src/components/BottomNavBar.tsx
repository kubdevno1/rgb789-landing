// Design: Electric Stadium — Fixed bottom navigation bar for mobile
// Matches the original site's bottom nav

import { SITE_INFO } from "@/lib/constants";
import { trackRegisterClick, trackLoginClick, trackLineContactClick } from "@/lib/analytics";
import { LogIn, UserPlus, Gift, MessageCircle } from "lucide-react";

export default function BottomNavBar() {
  const handleNavClick = (label: string, href: string) => {
    if (href === SITE_INFO.registerUrl) {
      trackRegisterClick("bottom-nav");
    } else if (href === SITE_INFO.loginUrl) {
      trackLoginClick("bottom-nav");
    } else if (href === SITE_INFO.lineUrl) {
      trackLineContactClick("bottom-nav");
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: "linear-gradient(180deg, rgba(30,10,60,0.98) 0%, rgba(15,2,37,0.99) 100%)",
        borderTop: "1px solid rgba(139,92,246,0.25)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="grid grid-cols-5 h-16">
        {[
          { icon: LogIn, label: "เข้าสู่ระบบ", href: SITE_INFO.loginUrl },
          { icon: UserPlus, label: "สมัคร", href: SITE_INFO.registerUrl, highlight: true },
          { icon: null, label: "RGB789", href: "/", isLogo: true },
          { icon: Gift, label: "โปรโมชั่น", href: "#promotions" },
          { icon: MessageCircle, label: "ติดต่อเรา", href: SITE_INFO.lineUrl },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => handleNavClick(item.label, item.href)}
            className="flex flex-col items-center justify-center gap-0.5 transition-colors"
          >
            {item.isLogo ? (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center -mt-6 relative overflow-hidden"
                style={{
                  boxShadow: "0 0 20px rgba(255,215,0,0.4), 0 4px 12px rgba(0,0,0,0.3)",
                  border: "3px solid rgba(15,2,37,0.9)",
                }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo-full_e43066ad.jpg"
                  alt="RGB789 Logo"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <>
                {item.icon && (
                  <item.icon
                    size={20}
                    style={{
                      color: item.highlight ? "#FFD700" : "rgba(255,255,255,0.6)",
                    }}
                  />
                )}
                <span
                  className="text-[10px] font-medium"
                  style={{
                    fontFamily: "'Kanit', sans-serif",
                    color: item.highlight ? "#FFD700" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.label}
                </span>
              </>
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
