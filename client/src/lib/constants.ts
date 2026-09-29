// ===== RGB789 Landing Page Constants =====
// Design: Electric Stadium — Modern Sports Broadcasting UI + Gaming Interface
// Colors: Deep Purple Gradient + Vivid Gold + Electric accents

export const IMAGES = {
  heroStadium: "/images/legacy/hero-stadium-btJQKs9axtq6ktFKC59Euj.webp",
  casinoLive: "/images/legacy/casino-live-8TAgrDq9q7XNBVSTZ7UB8y.webp",
  slotGames: "/images/legacy/slot-games-BfnjKuuFh4U5MGSzRcpWL5.webp",
  sportsBetting: "/images/legacy/sports-betting-NhgRnY7cv8hS5wLG62yE6t.webp",
  promoBanner: "/images/legacy/promo-banner-4ghucn5AArY73W8K5B9gjq.webp",
} as const;

export const SITE_INFO = {
  name: "RGB789",
  domain: "rgb789.fun",
  tagline: "เว็บพนันออนไลน์ครบวงจร อันดับ 1 ในไทย",
  description: "เมื่ออยากเล่นคาสิโน ให้นึกถึง RGB789 เว็บพนันออนไลน์ที่รวมเกมจากค่ายชั้นนำไว้ในเว็บเดียว",
  registerUrl: "https://line.me/ti/p/@311ukzxq",
  loginUrl: "https://line.me/ti/p/@311ukzxq",
  lineUrl: "https://line.me/ti/p/@311ukzxq",
} as const;

export const GAME_CATEGORIES = [
  { id: "sports", name: "แทงบอล", icon: "⚽", description: "แทงบอลออนไลน์ ราคาดีที่สุด ครบทุกลีก" },
  { id: "casino", name: "คาสิโนสด", icon: "🎰", description: "คาสิโนสด ถ่ายทอดสดจากค่ายดัง" },
  { id: "slots", name: "เกมสล็อต", icon: "🎲", description: "สล็อตออนไลน์ แตกง่าย จ่ายจริง" },
  { id: "fishing", name: "เกมยิงปลา", icon: "🐟", description: "เกมยิงปลา รวมทุกค่ายดัง" },
  { id: "table", name: "โต๊ะเกม", icon: "♠️", description: "โต๊ะเกม ไพ่ป๊อกเด้ง ไฮโล" },
] as const;

export const SPORTS_PROVIDERS = [
  "WS Sports", "SABA Sports", "CMD Sports", "IM Sports", "SBOBET", "UG Sports"
] as const;

export const CASINO_PROVIDERS = [
  "SA Gaming", "Sexy Gaming", "PG Slot", "Pretty Gaming", "Dream Gaming", "WM Casino"
] as const;

export const SLOT_PROVIDERS = [
  "PG Soft", "Pragmatic Play", "Joker Gaming", "Spadegaming", "CQ9", "JILI"
] as const;

export const PAYMENT_METHODS = [
  "กสิกรไทย", "ไทยพาณิชย์", "กรุงเทพ", "กรุงศรี", "ออมสิน", "แลนด์ แอนด์ เฮ้าส์",
  "ทีเอ็มบีธนชาต", "ทหารไทยธนชาต", "กรุงไทย", "TrueMoney Wallet"
] as const;

export const STEPS = [
  {
    number: "01",
    title: "สมัครสมาชิก",
    description: "กรอกข้อมูลและสมัครสมาชิกภายใน 3 นาที",
    icon: "📝",
    image: "/images/legacy/howto-step-1.jpg",
  },
  {
    number: "02",
    title: "ฝากเงินครั้งแรก",
    description: "ฝากเงินกับระบบออโต้ภายใน 30 วินาที",
    icon: "💰",
    image: "/images/legacy/howto-step-2.jpg",
  },
  {
    number: "03",
    title: "เข้าเดิมพันทันที",
    description: "สนุกไปกับการเดิมพันกับค่ายเกมทั่วโลก",
    icon: "🎮",
    image: "/images/legacy/howto-step-3.jpg",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "RGB789 คืออะไร?",
    answer: "RGB789 คือเว็บพนันออนไลน์ครบวงจรที่รวบรวมเกมคาสิโนจากทุกค่ายดังทั่วโลก ไม่ว่าจะเป็น SA Gaming, Sexy Gaming, PG Slot, Pretty Gaming และอีกมากมาย ให้บริการทั้งคาสิโนสด สล็อตออนไลน์ แทงบอล เกมยิงปลา และโต๊ะเกม ในเว็บเดียว"
  },
  {
    question: "สมัครสมาชิก RGB789 ยากไหม?",
    answer: "สมัครสมาชิกง่ายมาก ใช้เวลาเพียง 3 นาที เพียงกรอกข้อมูลพื้นฐาน ยืนยันตัวตน และเริ่มเล่นได้ทันที ระบบรองรับการใช้งานทั้งบนคอมพิวเตอร์และมือถือ"
  },
  {
    question: "ฝาก-ถอนเงินใช้เวลานานไหม?",
    answer: "RGB789 ใช้ระบบฝาก-ถอนอัตโนมัติ (Auto) ที่รวดเร็วที่สุด ฝากเงินภายใน 30 วินาที ถอนเงินภายใน 1-3 นาที รองรับธนาคารชั้นนำทุกธนาคารและ TrueMoney Wallet"
  },
  {
    question: "RGB789 มีโปรโมชั่นอะไรบ้าง?",
    answer: "RGB789 มีโปรโมชั่นมากมาย เช่น โบนัสต้อนรับสมาชิกใหม่ คืนยอดเสีย ทุกยอดฝากรับ 2% ทุกวัน และโปรโมชั่นพิเศษอื่นๆ อีกมากมายที่อัปเดตเป็นประจำ"
  },
  {
    question: "RGB789 ปลอดภัยไหม?",
    answer: "RGB789 ได้รับใบอนุญาตถูกต้องตามกฎหมาย มีระบบรักษาความปลอดภัย SSL Encryption ระดับสูงสุด ข้อมูลส่วนตัวและธุรกรรมทางการเงินของสมาชิกได้รับการปกป้องอย่างเข้มงวด"
  },
  {
    question: "เล่นผ่านมือถือได้ไหม?",
    answer: "ได้แน่นอน RGB789 รองรับการเล่นผ่านมือถือทุกระบบ ทั้ง iOS และ Android ไม่ต้องดาวน์โหลดแอปพลิเคชัน เล่นผ่านเว็บเบราว์เซอร์ได้ทันที"
  },
] as const;
