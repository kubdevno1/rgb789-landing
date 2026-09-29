// Design: Electric Stadium — Scrolling announcement bar with gold text on purple
// Matches the original site's marquee feature

export default function MarqueeBar() {
  const text = "🏆 เมื่ออยากเล่นคาสิโน ให้นึกถึง RGB789.FUN เว็บพนันออนไลน์ ที่มีเกมส์คาสิโนจากทุกค่าย รวมเอามาไว้ให้เล่นในเว็บเดียว SA GAMING, SEXY GAMING, PG, PRETTY GAMING 🏆 ฝากถอนออโต้ รวดเร็วภายใน 30 วินาที 🏆 สมัครสมาชิกวันนี้ รับโบนัสทันที 🏆";

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{
        background: "linear-gradient(90deg, rgba(139,92,246,0.2) 0%, rgba(255,215,0,0.1) 50%, rgba(139,92,246,0.2) 100%)",
        borderTop: "1px solid rgba(139,92,246,0.15)",
        borderBottom: "1px solid rgba(139,92,246,0.15)",
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        <span
          className="text-sm font-medium mx-8"
          style={{
            fontFamily: "'Kanit', sans-serif",
            background: "linear-gradient(90deg, #FFD700, #FFC107, #FFE066, #FFC107, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {text}
        </span>
        <span
          className="text-sm font-medium mx-8"
          style={{
            fontFamily: "'Kanit', sans-serif",
            background: "linear-gradient(90deg, #FFD700, #FFC107, #FFE066, #FFC107, #FFD700)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
