# BottomNavBar Responsive Verification

ตรวจ breakpoint 320px, 390px และ 430px ด้วย screenshot capture และ regression calculation ใน `server/bottom-nav-logo.test.ts` แล้ว โดย grid 5 คอลัมน์มีความกว้างต่อคอลัมน์อย่างน้อย 56px ที่ viewport 320px ซึ่งเท่ากับขนาดปุ่มโลโก้ `w-14 h-14` พอดี และที่ 390px/430px มีพื้นที่มากกว่า โลโก้จึงไม่ล้นคอลัมน์ใน mobile breakpoint

ผลการทดสอบ: `pnpm test -- server/bottom-nav-logo.test.ts` ผ่าน 26 tests และ `pnpm check` ผ่าน
