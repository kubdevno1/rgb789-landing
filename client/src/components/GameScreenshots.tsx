// Design: Electric Stadium — Game Screenshots showcase
// Displays game screenshots in a grid layout

import React from "react";
import { SITE_INFO } from "@/lib/constants";
import { trackRegisterClick } from "@/lib/analytics";

const GAME_IMAGES = [
  {
    id: 1,
    title: "เกมสล็อต 1",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_1_8d3e9f2a.jpg",
  },
  {
    id: 2,
    title: "เกมสล็อต 2",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_2_9e4fa0b3.jpg",
  },
  {
    id: 3,
    title: "เกมสล็อต 3",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_3_0f5ab1c4.jpg",
  },
  {
    id: 4,
    title: "เกมสล็อต 4",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_4_1g6bc2d5.jpg",
  },
  {
    id: 5,
    title: "เกมสล็อต 5",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_5_2h7cd3e6.jpg",
  },
  {
    id: 6,
    title: "เกมสล็อต 6",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_6_3i8de4f7.jpg",
  },
  {
    id: 7,
    title: "เกมสล็อต 7",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_7_4j9ef5g8.jpg",
  },
  {
    id: 8,
    title: "เกมสล็อต 8",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_8_5k0fg6h9.jpg",
  },
  {
    id: 9,
    title: "เกมสล็อต 9",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_9_6l1gh7i0.jpg",
  },
  {
    id: 10,
    title: "เกมสล็อต 10",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_10_7m2hi8j1.jpg",
  },
  {
    id: 11,
    title: "เกมสล็อต 11",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_อื่นๆ_240723_11_8n3ij9k2.jpg",
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
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
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
