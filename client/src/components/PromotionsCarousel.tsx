// Design: Electric Stadium — Promotions Carousel with real promo images
// Uses the same CDN images as PromoPopup for consistency

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_INFO } from "@/lib/constants";
import { trackCarouselSwipe, trackRegisterClick } from "@/lib/analytics";

// Featured offers only: full catalog remains available at /promotions.
// AVIF cards are sized for the 264px homepage carousel instead of using original 1040px+ images.
const PROMOTIONS = [
  {
    id: 1,
    title: "สมาชิกใหม่ฝาก 100 รับ 200 บาท",
    image: "/images/promos/promo-01.webp",
  },
  {
    id: 2,
    title: "สมาชิกใหม่รับโบนัสสูงสุด 60%",
    image: "/images/promos/promo-02.webp",
  },
  {
    id: 3,
    title: "คืนยอดเสียสูงสุด 3-7%",
    image: "/images/promos/promo-03.webp",
  },
  {
    id: 4,
    title: "ทุกยอดฝากรับ 2% ทุกวัน",
    image: "/images/promos/promo-04.webp",
  },
];

export default function PromotionsCarousel() {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const CARD_WIDTH = 280; // px including gap

  const updateScrollButtons = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const amount = direction === "left" ? -CARD_WIDTH : CARD_WIDTH;
    el.scrollBy({ left: amount, behavior: "smooth" });
    const idx = Math.round((el.scrollLeft + amount) / CARD_WIDTH);
    trackCarouselSwipe("promotions", direction, idx);
  }, []);

  // Auto-scroll every 3.5 seconds
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
      }
    }, 3500);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
    startAutoScroll();
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [updateScrollButtons, startAutoScroll]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dist = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(dist) > 50) {
      scroll(dist > 0 ? "right" : "left");
      startAutoScroll(); // reset timer on swipe
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-purple-950 to-purple-900">
      <div className="container">
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{
            fontFamily: "'Kanit', sans-serif",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          โปรโมชั่นพิเศษ
        </h2>

        <div className="relative">
          {/* Carousel Container */}
          <div
            ref={containerRef}
            id="promo-carousel"
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {PROMOTIONS.map((promo) => (
              <a
                key={promo.id}
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRegisterClick(`promotion-carousel-${promo.id}`, promo.title)}
                className="flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer transition-transform hover:scale-105"
                style={{
                  width: "264px",
                  background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(168,85,247,0.1) 100%)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  textDecoration: "none",
                }}
              >
                {/* Square image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    width="640"
                    height="640"
                    sizes="(max-width: 640px) 76vw, 264px"
                    loading={promo.id === 1 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
                {/* Title */}
                <div className="px-3 py-2.5">
                  <p
                    className="text-white font-semibold text-sm text-center leading-snug"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                  >
                    {promo.title}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => { scroll("left"); startAutoScroll(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 text-white p-2 rounded-full transition-all shadow-lg"
              style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}
              aria-label="ก่อนหน้า"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => { scroll("right"); startAutoScroll(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 text-white p-2 rounded-full transition-all shadow-lg"
              style={{ background: "linear-gradient(135deg, #7c3aed, #9333ea)" }}
              aria-label="ถัดไป"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
