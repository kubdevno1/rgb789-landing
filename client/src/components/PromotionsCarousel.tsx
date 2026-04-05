// Design: Electric Stadium — Promotions Carousel with swipe support
// Displays promotional offers in a scrollable carousel

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROMOTIONS = [
  {
    id: 1,
    title: "โปรโมชั่น 1",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_1_7c2b9c0e.jpg",
  },
  {
    id: 2,
    title: "โปรโมชั่น 2",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_2_c5c3c8f8.jpg",
  },
  {
    id: 3,
    title: "โปรโมชั่น 3",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_3_6f7c8e9d.jpg",
  },
  {
    id: 4,
    title: "โปรโมชั่น 4",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_4_8a5c9f1b.jpg",
  },
  {
    id: 5,
    title: "โปรโมชั่น 5",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_5_9b6d0a2c.jpg",
  },
  {
    id: 6,
    title: "โปรโมชั่น 6",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_6_a7c1b3d9.jpg",
  },
  {
    id: 7,
    title: "โปรโมชั่น 7",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_7_b8d2c4e0.jpg",
  },
  {
    id: 8,
    title: "โปรโมชั่น 8",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_8_c9e3d5f1.jpg",
  },
  {
    id: 9,
    title: "โปรโมชั่น 9",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_9_d0f4e6a2.jpg",
  },
  {
    id: 10,
    title: "โปรโมชั่น 10",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_10_e1a5f7b3.jpg",
  },
  {
    id: 11,
    title: "โปรโมชั่น 11",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_11_f2b6a8c4.jpg",
  },
  {
    id: 12,
    title: "โปรโมชั่น 12",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_12_a3c7b9d5.jpg",
  },
  {
    id: 13,
    title: "โปรโมชั่น 13",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/LINE_ALBUM_โปรโมชั่น_240723_13_b4d8cae6.jpg",
  },
];

export default function PromotionsCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("promo-carousel");
    if (!container) return;

    const scrollAmount = 320;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
    updateScrollButtons(newPosition, container);
  };

  const updateScrollButtons = (position: number, container: HTMLElement) => {
    setCanScrollLeft(position > 0);
    setCanScrollRight(position < container.scrollWidth - container.clientWidth - 10);
  };

  useEffect(() => {
    const container = document.getElementById("promo-carousel");
    if (!container) return;

    const handleScroll = () => {
      updateScrollButtons(container.scrollLeft, container);
    };

    container.addEventListener("scroll", handleScroll);
    updateScrollButtons(0, container);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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
            id="promo-carousel"
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {PROMOTIONS.map((promo) => (
              <div
                key={promo.id}
                className="flex-shrink-0 w-80 rounded-lg overflow-hidden group cursor-pointer transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(168,85,247,0.1) 100%)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-4">
                  <p
                    className="text-white font-semibold text-center"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                  >
                    {promo.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white p-2 rounded-full transition-all shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white p-2 rounded-full transition-all shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
