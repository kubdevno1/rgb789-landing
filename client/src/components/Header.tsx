// Design: Electric Stadium — sticky header with glass morphism
// Colors: Deep purple background with gold accents

import { useState } from "react";
import { SITE_INFO, GAME_CATEGORIES } from "@/lib/constants";
import { trackRegisterClick, trackLoginClick } from "@/lib/analytics";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="backdrop-blur-xl border-b"
        style={{
          background: "linear-gradient(90deg, rgba(15,2,37,0.95) 0%, rgba(45,10,78,0.9) 50%, rgba(15,2,37,0.95) 100%)",
          borderColor: "rgba(139,92,246,0.2)",
        }}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663187662312/VGyYopoy4jPaukwiBaCcsR/rgb789-logo-new_41b39511.webp"
              alt="RGB789 - เว็บพนันออนไลน์อันดับ 1"
              className="h-10 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {GAME_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-4 py-2 text-sm font-medium text-white/80 hover:text-yellow-400 transition-colors duration-300 rounded-lg hover:bg-white/5"
                style={{ fontFamily: "'Kanit', sans-serif" }}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE_INFO.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLoginClick("header")}
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white/90 border rounded-lg transition-all duration-300 hover:bg-white/10"
              style={{
                fontFamily: "'Kanit', sans-serif",
                borderColor: "rgba(139,92,246,0.4)",
              }}
            >
              เข้าสู่ระบบ
            </a>
            <a
              href={SITE_INFO.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackRegisterClick("header")}
              className="inline-flex px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Kanit', sans-serif",
                background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                color: "#1a0533",
                boxShadow: "0 0 20px rgba(255,215,0,0.3), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              สมัครสมาชิก
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-yellow-400 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b"
            style={{
              background: "rgba(15,2,37,0.98)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(139,92,246,0.2)",
            }}
          >
            <nav className="container py-4 flex flex-col gap-1">
              {GAME_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors"
                  style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-medium">{cat.name}</span>
                </a>
              ))}
              <a
                href={SITE_INFO.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden flex items-center gap-3 px-4 py-3 text-white/80 hover:text-yellow-400 hover:bg-white/5 rounded-lg transition-colors mt-2 border-t"
                style={{ fontFamily: "'Kanit', sans-serif", borderColor: "rgba(139,92,246,0.15)" }}
              >
                <span className="font-medium">เข้าสู่ระบบ</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
