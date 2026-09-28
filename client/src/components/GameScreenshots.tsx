// Design: Electric Stadium — Game Screenshots showcase
// Displays game screenshots in a grid layout

import React from "react";
import { SITE_INFO } from "@/lib/constants";
import { trackRegisterClick, trackGalleryImageClick, trackLightboxOpen, trackLightboxClose } from "@/lib/analytics";

const GAME_IMAGES = [
  {
    id: 1,
    title: "เกมสล็อตยอดนิยม",
    image: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  },
  {
    id: 2,
    title: "คาสิโนสด",
    image: "/images/legacy/casino-live-8TAgrDq9q7XNBVSTZ7UB8y.webp",
  },
  {
    id: 3,
    title: "เดิมพันกีฬา",
    image: "/images/legacy/sports-betting-NhgRnY7cv8hS5wLG62yE6t.webp",
  },
  {
    id: 4,
    title: "โปรโมชั่นพิเศษ",
    image: "/images/legacy/promo-banner-4ghucn5AArY73W8K5B9gjq.webp",
  },
  {
    id: 5,
    title: "ค่ายเกมชั้นนำ",
    image: "/images/legacy/hero-stadium-btJQKs9axtq6ktFKC59Euj.webp",
  },
  {
    id: 6,
    title: "เริ่มต้นเล่นง่าย",
    image: "/images/legacy/howto-step-3.jpg",
  },
];

export default function GameScreenshots() {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      // Swipe detected - can be used for future gallery navigation
      console.log(isLeftSwipe ? "Swiped left" : "Swiped right");
    }
  };

  const handlePlayClick = () => {
    trackRegisterClick("game-screenshots");
    window.open(SITE_INFO.registerUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-purple-900 to-purple-950">
      <div className="container">
        <h2
          className="text-3xl font-bold mb-12 text-center"
          style={{
            fontFamily: "'Kanit', sans-serif",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ภาพเกมที่น่าตื่นเต้น
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {GAME_IMAGES.map((game) => (
            <div
              key={game.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(168,85,247,0.1) 100%)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
              onClick={() => {
                trackGalleryImageClick("game-screenshots", game.id);
                trackLightboxOpen("game-screenshots", game.id);
              }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <p
                  className="text-white font-semibold text-center"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  {game.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handlePlayClick}
            className="px-8 py-3 rounded-lg font-bold transition-all duration-300"
            style={{
              fontFamily: "'Kanit', sans-serif",
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              color: "#1a0533",
              boxShadow: "0 0 30px rgba(255,215,0,0.4), 0 8px 20px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 40px rgba(255,215,0,0.6), 0 12px 30px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,215,0,0.4), 0 8px 20px rgba(0,0,0,0.3)";
            }}
          >
            เล่นเลยตอนนี้
          </button>
        </div>
      </div>
    </section>
  );
}
