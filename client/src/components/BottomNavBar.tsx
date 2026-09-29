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
      <div className="grid grid-cols-5 h-20 gap-1.5 px-2 py-2">
        {[
          { icon: LogIn, label: "เข้าสู่ระบบ", href: SITE_INFO.loginUrl },
          { icon: UserPlus, label: "สมัคร", href: SITE_INFO.registerUrl, highlight: true },
          { icon: null, label: "RGB789", href: "/", isLogo: true },
          { icon: Gift, label: "โปรโมชั่น", href: "/promotions" },
          { icon: MessageCircle, label: "ติดต่อเรา", href: SITE_INFO.lineUrl },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            onClick={() => handleNavClick(item.label, item.href)}
            aria-label={item.isLogo ? "หน้าหลัก RGB789" : item.label}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 active:scale-95 ${
              item.isLogo
                ? "relative z-10 -mt-6 rounded-full sm:-mt-7"
                : "rounded-lg hover:bg-white/5"
            }`}
            style={{
              background: "transparent",
              border: "1px solid transparent",
            }}
          >
            {item.isLogo ? (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden p-1.5 sm:w-16 sm:h-16"
                style={{
                  boxShadow: "0 0 0 3px rgba(24,4,54,0.98), 0 0 22px rgba(255,215,0,0.55), inset 0 0 12px rgba(255,215,0,0.25)",
                  border: "2px solid rgba(255,215,0,0.9)",
                  background: "radial-gradient(circle at 35% 25%, #5d268c 0%, #21063f 68%)",
                }}
              >
                <img
                  src="/images/legacy/rgb789-logo-full_e43066ad.jpg"
                  alt="RGB789 Logo"
                  className="w-full h-full rounded-full object-contain bg-[#250745]"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <>
                {item.icon && (
                  <item.icon
                    size={24}
                    style={{
                      color: item.highlight ? "#FFD700" : "rgba(255,255,255,0.6)",
                      transition: "all 0.3s ease",
                    }}
                  />
                )}
                <span
                  className="text-[9px] font-medium leading-tight text-center"
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
