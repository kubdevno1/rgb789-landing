// Design: Electric Stadium — Trust Badges for credibility
// Displays SSL, verified, awards, and security badges

import { Shield, Award, CheckCircle, Lock } from "lucide-react";

const BADGES = [
  {
    id: 1,
    icon: Lock,
    title: "SSL Secure",
    description: "256-bit Encryption",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 2,
    icon: CheckCircle,
    title: "ตรวจสอบข้อมูล",
    description: "อ่านเงื่อนไขก่อนใช้งาน",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    icon: Award,
    title: "ข้อมูลชัดเจน",
    description: "แสดงรายละเอียดบริการ",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: 4,
    icon: Shield,
    title: "ใช้งานอย่างรับผิดชอบ",
    description: "กำหนดขอบเขตการใช้งาน",
    color: "from-purple-500 to-pink-600",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 px-4 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border-t border-purple-800">
      <div className="container">
        <h2 className="text-center text-lg font-bold text-white/80 mb-8" style={{ fontFamily: "'Kanit', sans-serif" }}>
          ความเชื่อมั่นและความปลอดภัย
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {BADGES.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                className="group relative rounded-lg overflow-hidden p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(168,85,247,0.05) 100%)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${badge.color})`,
                    opacity: 0.05,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className="mb-3 p-3 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                    style={{
                      background: `linear-gradient(135deg, ${badge.color})`,
                    }}
                  >
                    <IconComponent size={28} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm font-bold text-white mb-1"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                  >
                    {badge.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/60" style={{ fontFamily: "'Kanit', sans-serif" }}>
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Statement */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm" style={{ fontFamily: "'Kanit', sans-serif" }}>
            โปรดตรวจสอบข้อมูลและเงื่อนไขล่าสุดจากหน้าเว็บไซต์ก่อนตัดสินใจใช้งาน
          </p>
        </div>
      </div>
    </section>
  );
}
