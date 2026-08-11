# Project TODO

- [x] ตรวจสอบโครงสร้างโปรเจกต์และยืนยันว่า build/run ได้
- [x] ตรวจสอบและยืนยันว่า .gitignore ป้องกันไฟล์ลับและไฟล์ build ที่ไม่ควร commit
- [x] ตรวจสอบ repository และการเชื่อมต่อ GitHub
- [x] Push commit ที่พร้อมใช้งานไปยัง branch main และยืนยันผลบน GitHub
- [x] ยืนยัน commit และไฟล์บน GitHub
- [x] วิเคราะห์ build warnings และขนาด bundle ปัจจุบัน
- [x] แก้ไข CSS warning และปรับ code splitting เพื่อลด bundle เริ่มต้น
- [x] Build และตรวจสอบผลลัพธ์หลังปรับปรุง
- [x] แก้ pnpm deployment configuration และยืนยันว่า production build สำเร็จ
- [x] รัน Lighthouse mobile audit บนเว็บไซต์ที่เผยแพร่และบันทึก diagnostic NO_FCP
- [x] สรุปผล Mobile audit พร้อมข้อเสนอแนะที่จัดลำดับตามผลกระทบ
- [x] ตรวจสอบ loading flow และจุดที่ปิดกั้นการ render หน้าแรก
- [x] ปรับ LoadingScreen เป็น overlay ที่ไม่ซ่อนเนื้อหาหลัก
- [x] Build และทดสอบ Mobile Lighthouse หลังปรับ loading flow
- [x] วิเคราะห์ unused JavaScript จาก Lighthouse report และ dependency graph หน้าแรก
- [x] ย้ายโมดูลที่ไม่จำเป็นต่อหน้าแรกไปโหลดตามการใช้งาน
- [x] Build, regression test และรัน Lighthouse mobile เปรียบเทียบผลหลังลด unused JS
