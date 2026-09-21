# ขั้นตอนส่ง Sitemap และขอ Indexing: RGB789

เว็บไซต์ได้อัปเดตไฟล์ sitemap ให้เหลือเฉพาะ canonical URLs ที่ Google ควรจัดทำดัชนี ได้แก่หน้าแรก, `/demo-slot`, `/free-credit`, `/slot789`, `/promotions` และ `/articles` โดย sitemap อยู่ที่ `https://rgb789.me/sitemap.xml`.

ให้เข้าสู่ [Google Search Console](https://search.google.com/search-console) ด้วยบัญชีที่เป็น Owner ของพร็อพเพอร์ตี `rgb789.me` จากนั้นเปิดเมนู **Sitemaps** ใส่ `sitemap.xml` ในช่อง “Add a new sitemap” แล้วกด Submit. หลังสถานะ sitemap เป็น Success ให้ใช้เมนู **URL inspection** ส่งคำขอ **Request indexing** สำหรับ URLs ต่อไปนี้ทีละรายการ:

| ลำดับ | Canonical URL | วัตถุประสงค์ |
|---:|---|---|
| 1 | https://rgb789.me/ | หน้าหลัก |
| 2 | https://rgb789.me/demo-slot | คีย์เวิร์ดทดลองเล่นสล็อต |
| 3 | https://rgb789.me/free-credit | คีย์เวิร์ดเครดิตฟรี |
| 4 | https://rgb789.me/slot789 | คีย์เวิร์ดสล็อต789 |
| 5 | https://rgb789.me/promotions | โปรโมชั่น |
| 6 | https://rgb789.me/articles | บทความ |

อย่าส่ง URL aliases ภาษาไทย `/ทดลองเล่นสล็อต` และ `/เครดิตฟรี` เนื่องจากเว็บไซต์ตั้งค่า 301 redirect ไปที่ canonical URLs แล้ว. หลังส่งคำขอ ให้ตรวจรายงาน Page indexing ภายใน 3–14 วัน และแก้เฉพาะสถานะที่เป็น “Excluded” หรือ “Crawled – currently not indexed” ตามสาเหตุที่รายงานระบุ.
