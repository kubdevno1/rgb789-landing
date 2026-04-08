// Design: Electric Stadium — Fixed bottom navigation bar for mobile
// Style: รูป 1 — สีม่วงเข้ม, ไอคอน 3D, logo floating กลาง

import { SITE_INFO } from "@/lib/constants";
import { trackRegisterClick, trackLoginClick, trackLineContactClick } from "@/lib/analytics";
import { useRegisterTracking } from "@/hooks/useRegisterTracking";

const NAV_ITEMS = [
  {
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/nav-icon-login-c42KxMWV2xyfBTYVWUFFP6.webp",
    label: "เข้าสู่ระบบ",
    href: SITE_INFO.loginUrl,
    isLogo: false,
  },
  {
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/nav-icon-register-c9ecnYFsAKPncPxXrZ5c2w.webp",
    label: "สมัครสมาชิก",
    href: SITE_INFO.registerUrl,
    highlight: true,
    isLogo: false,
  },
  {
    icon: null,
    label: "",
    href: "/",
    isLogo: true,
  },
  {
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/nav-icon-promotion-BVXLhoYxZRhwsFncHNEwHJ.webp",
    label: "โปรโมชั่น",
    href: "#promotions",
    isLogo: false,
  },
  {
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/nav-icon-contact-fzaJhYUtYebwm3r738KpDW.webp",
    label: "ติดต่อเรา",
    href: SITE_INFO.lineUrl,
    isLogo: false,
  },
];

export default function BottomNavBar() {
  const { trackClick } = useRegisterTracking();

  const handleNavClick = (label: string, href: string) => {
    if (href === SITE_INFO.registerUrl) {
      trackRegisterClick("bottom-nav");
      trackClick("bottom_nav_register_button");
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
        background: "linear-gradient(180deg, #3d1a6e 0%, #2a0f52 100%)",
        borderTop: "1px solid rgba(180,120,255,0.35)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
      }}
    >
      <div className="grid grid-cols-5 h-[68px] items-end pb-2">
        {NAV_ITEMS.map((item, i) => {
          if (item.isLogo) {
            return (
              <a
                key={i}
                href={item.href}
                className="flex flex-col items-center justify-end relative"
                style={{ marginBottom: "-2px" }}
              >
                {/* Floating logo button */}
                <div
                  className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center overflow-hidden absolute"
                  style={{
                    bottom: "8px",
                    background: "linear-gradient(135deg, #2a0f52 0%, #1a0533 100%)",
                    border: "2.5px solid rgba(255,215,0,0.7)",
                    boxShadow:
                      "0 -6px 20px rgba(139,92,246,0.5), 0 4px 16px rgba(0,0,0,0.5), inset 0 0 12px rgba(255,215,0,0.1)",
                  }}
                >
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo-full_e43066ad.jpg"
                    alt="RGB789 Logo"
                    className="w-full h-full object-cover rounded-xl"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </a>
            );
          }

          return (
            <a
              key={i}
              href={item.href}
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => handleNavClick(item.label, item.href)}
              className="flex flex-col items-center justify-end gap-1 pb-1 active:scale-95 transition-transform duration-150"
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-9 h-9 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <span
                className="text-[9px] font-medium leading-tight text-center"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  color: item.highlight ? "#FFD700" : "rgba(255,255,255,0.85)",
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
