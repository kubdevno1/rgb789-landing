// Design: Electric Stadium — SEO Articles section
// SEO: Long-form articles about slot games for organic search ranking
// Colors: Deep Purple Gradient + Vivid Gold + Electric accents

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE_INFO, IMAGES } from "@/lib/constants";
import { CANONICAL_ORIGIN } from "@/ssr/routeManifest";
import { BookOpen, ChevronRight, Clock, Star, Zap, TrendingUp, Sparkles, Dice1, Trophy, Target, Tv, Share2 } from "lucide-react";

type TabKey = "all" | "slots" | "casino" | "sports";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "ทั้งหมด" },
  { key: "slots", label: "สล็อต" },
  { key: "casino", label: "คาสิโนสด" },
  { key: "sports", label: "แทงบอล" },
];

const ARTICLES = [
  {
    id: "slot-guide",
    category: "slots",
    title: "คู่มือเล่นสล็อตออนไลน์ ฉบับมือใหม่ 2567",
    excerpt: "เรียนรู้วิธีเล่นสล็อตออนไลน์ตั้งแต่พื้นฐาน เทคนิคการเลือกเกม อัตรา RTP และวิธีบริหารเงินทุนอย่างมืออาชีพ",
    readTime: "8 นาที",
    icon: BookOpen,
    tag: "คู่มือ",
    content: `สล็อตออนไลน์ คือเกมพนันออนไลน์ที่ได้รับความนิยมมากที่สุดในปัจจุบัน ด้วยรูปแบบการเล่นที่ง่าย กราฟิกสวยงาม และโอกาสชนะรางวัลใหญ่ ทำให้ผู้เล่นทั่วโลกหลงใหลในเกมประเภทนี้ ที่ RGB789 เรารวบรวมเกมสล็อตจากค่ายชั้นนำกว่า 500 เกม ให้คุณเลือกเล่นได้ตามใจชอบ ไปที่ส่วน <a href="#slots" style="color: #FFD700; text-decoration: underline;">เกมสล็อตออนไลน์</a> เพื่อเริ่มเล่นทันที

สล็อตออนไลน์ทำงานโดยใช้ระบบ RNG (Random Number Generator) ซึ่งเป็นระบบสุ่มตัวเลขที่รับรองความยุติธรรมในทุกรอบการหมุน ผู้เล่นเพียงแค่กดปุ่มหมุน (Spin) แล้วรอดูผลลัพธ์ หากสัญลักษณ์เรียงตัวตรงกับเส้นจ่ายเงิน (Payline) ก็จะได้รับรางวัลตามอัตราจ่ายที่กำหนด

RTP (Return to Player) คืออัตราการจ่ายคืนให้ผู้เล่นในระยะยาว เช่น เกมที่มี RTP 96% หมายความว่าในทุกๆ 100 บาทที่เดิมพัน ผู้เล่นจะได้รับคืนเฉลี่ย 96 บาท การเลือกเกมที่มี RTP สูงจะช่วยเพิ่มโอกาสในการชนะ ที่ RGB789 ทุกเกมสล็อตมี RTP เริ่มต้นที่ 95% ขึ้นไป

Volatility หรือความผันผวนของเกม แบ่งเป็น 3 ระดับ ได้แก่ ต่ำ (Low) ชนะบ่อยแต่รางวัลเล็ก, กลาง (Medium) สมดุลระหว่างความถี่และขนาดรางวัล, และสูง (High) ชนะไม่บ่อยแต่รางวัลใหญ่ ผู้เล่นควรเลือกระดับความผันผวนที่เหมาะกับสไตล์การเล่นและงบประมาณของตนเอง

การบริหารเงินทุน (Bankroll Management) เป็นสิ่งสำคัญที่สุดในการเล่นสล็อตออนไลน์ ควรกำหนดงบประมาณที่ยอมรับได้ก่อนเริ่มเล่น ไม่ควรเดิมพันเกินกว่า 2-5% ของเงินทุนทั้งหมดในแต่ละรอบ และควรหยุดเล่นเมื่อถึงเป้าหมายที่ตั้งไว้ ไม่ว่าจะเป็นกำไรหรือขาดทุน`,
  },
  {
    id: "top-slot-games",
    category: "slots",
    title: "10 เกมสล็อตยอดนิยม แตกง่าย จ่ายจริง 2567",
    excerpt: "รวมเกมสล็อตที่ผู้เล่นนิยมมากที่สุด จากค่ายดัง PG Soft, Pragmatic Play, JILI พร้อมอัตรา RTP สูง",
    readTime: "6 นาที",
    icon: Star,
    tag: "แนะนำ",
    content: `ในโลกของสล็อตออนไลน์ มีเกมมากมายให้เลือกเล่น แต่มีเพียงไม่กี่เกมที่โดดเด่นด้วยอัตราการจ่ายที่ดี กราฟิกสวยงาม และฟีเจอร์โบนัสที่น่าตื่นเต้น ที่ RGB789 เราได้คัดสรรเกมสล็อตยอดนิยมที่ผู้เล่นทั่วโลกให้ความไว้วางใจ

อันดับ 1 คือ Gates of Olympus จากค่าย Pragmatic Play เป็นเกมสล็อตธีมเทพเจ้ากรีก ที่มีฟีเจอร์ Tumble และ Multiplier ที่สามารถเพิ่มขึ้นได้ไม่จำกัด RTP อยู่ที่ 96.50% เหมาะสำหรับผู้เล่นที่ชอบความตื่นเต้นและรางวัลใหญ่

อันดับ 2 คือ Sweet Bonanza จากค่าย Pragmatic Play อีกหนึ่งเกมยอดนิยมที่มีธีมขนมหวานสีสันสดใส ฟีเจอร์ Free Spins พร้อม Multiplier สูงสุด 100 เท่า RTP 96.48% ความผันผวนสูง เหมาะสำหรับผู้เล่นที่ต้องการลุ้นรางวัลแจ็คพอต

อันดับ 3 คือ Mahjong Ways 2 จากค่าย PG Soft เกมสล็อตธีมไพ่นกกระจอกที่ได้รับความนิยมอย่างมากในเอเชีย มีฟีเจอร์ Wild ที่ช่วยเพิ่มโอกาสชนะ RTP 96.95% พร้อมโบนัสฟรีสปินที่แตกบ่อย

อันดับ 4 คือ Fortune Tiger จากค่าย PG Soft เกมสล็อตธีมเสือนำโชค 3x3 ที่เล่นง่าย มีฟีเจอร์ Re-Spin และ Multiplier RTP 96.81% เหมาะสำหรับผู้เล่นที่ชอบเกมรูปแบบคลาสสิก

อันดับ 5 คือ Starlight Princess จากค่าย Pragmatic Play เกมสล็อตธีมเจ้าหญิงอวกาศ มีฟีเจอร์คล้าย Gates of Olympus แต่กราฟิกสไตล์อนิเมะ RTP 96.50% ความผันผวนสูง

นอกจากนี้ยังมีเกมยอดนิยมอื่นๆ อีกมากมาย เช่น Lucky Neko, Candy Burst, Dragon Hatch, Wild Bandito และ Treasures of Aztec ทุกเกมสามารถทดลองเล่นฟรีได้ที่ RGB789 ก่อนเดิมพันด้วยเงินจริง`,
  },
  {
    id: "slot-tips",
    category: "slots",
    title: "เทคนิคเล่นสล็อตให้ได้กำไร สูตรที่มือโปรใช้จริง",
    excerpt: "เปิดเผยเทคนิคและกลยุทธ์การเล่นสล็อตที่นักเดิมพันมืออาชีพใช้ เพิ่มโอกาสชนะอย่างมีระบบ",
    readTime: "7 นาที",
    icon: TrendingUp,
    tag: "เทคนิค",
    content: `การเล่นสล็อตออนไลน์ให้ได้กำไรอย่างยั่งยืนนั้น ไม่ได้ขึ้นอยู่กับโชคเพียงอย่างเดียว แต่ต้องอาศัยเทคนิคและกลยุทธ์ที่ถูกต้อง ที่ RGB789 เราได้รวบรวมเทคนิคจากนักเดิมพันมืออาชีพมาแบ่งปันให้กับสมาชิกทุกท่าน

เทคนิคที่ 1 คือการเลือกเกมที่มี RTP สูง ควรเลือกเกมที่มี RTP ตั้งแต่ 96% ขึ้นไป เพราะจะให้อัตราการจ่ายคืนที่ดีกว่าในระยะยาว ที่ RGB789 ทุกเกมจะแสดงค่า RTP ให้ผู้เล่นตรวจสอบก่อนเริ่มเล่น

เทคนิคที่ 2 คือการใช้ระบบเดิมพันแบบขั้นบันได เริ่มต้นด้วยเงินเดิมพันต่ำ แล้วค่อยๆ เพิ่มขึ้นเมื่อชนะ และลดลงเมื่อแพ้ วิธีนี้ช่วยรักษาเงินทุนและเพิ่มโอกาสทำกำไรในระยะยาว

เทคนิคที่ 3 คือการสังเกตรูปแบบการจ่ายของเกม (Pattern) แม้สล็อตจะใช้ระบบ RNG แต่ผู้เล่นที่มีประสบการณ์จะสังเกตได้ว่าเกมบางเกมมีช่วงเวลาที่จ่ายดีกว่าปกติ การจดบันทึกผลการเล่นจะช่วยให้เข้าใจรูปแบบของเกมได้ดีขึ้น

เทคนิคที่ 4 คือการใช้ประโยชน์จากฟีเจอร์ Buy Free Spins หลายเกมมีฟีเจอร์ให้ซื้อฟรีสปินโดยตรง ซึ่งมักจะคุ้มค่ากว่าการรอให้ฟีเจอร์เปิดเองตามธรรมชาติ โดยเฉพาะในเกมที่มี Multiplier สูง

เทคนิคที่ 5 คือการตั้งเป้าหมายกำไรและขาดทุน ก่อนเริ่มเล่นทุกครั้ง ควรกำหนดว่าจะหยุดเมื่อกำไรถึงเท่าไหร่ และจะหยุดเมื่อขาดทุนเท่าไหร่ การมีวินัยในการเล่นเป็นกุญแจสำคัญสู่ความสำเร็จ

สมัครสมาชิก RGB789 วันนี้ เพื่อทดลองใช้เทคนิคเหล่านี้กับเกมสล็อตกว่า 500 เกม พร้อมรับโบนัสต้อนรับสมาชิกใหม่ และทุกยอดฝากรับ 2% ทุกวัน ดูเพิ่มเติมที่ <a href="#slots" style="color: #FFD700; text-decoration: underline;">หมวดเกมสล็อต</a>`,
  },
  {
    id: "pg-soft-review",
    category: "slots",
    title: "รีวิว PG Soft ค่ายสล็อตอันดับ 1 เกมแตกง่าย กราฟิกสวย",
    excerpt: "ทำความรู้จักค่าย PG Soft ผู้พัฒนาเกมสล็อตชั้นนำ พร้อมรีวิวเกมเด่นและเหตุผลที่ผู้เล่นเลือก",
    readTime: "5 นาที",
    icon: Sparkles,
    tag: "รีวิว",
    content: `PG Soft (Pocket Games Soft) เป็นผู้พัฒนาเกมสล็อตออนไลน์ชั้นนำจากประเทศมอลตา ก่อตั้งในปี 2015 และเติบโตอย่างรวดเร็วจนกลายเป็นหนึ่งในค่ายเกมที่ได้รับความนิยมมากที่สุดในเอเชียและทั่วโลก ที่ RGB789 เรามีเกมจาก PG Soft ให้เลือกเล่นครบทุกเกม

จุดเด่นของ PG Soft คือกราฟิกที่สวยงามระดับ 3D แอนิเมชันลื่นไหล เอฟเฟกต์เสียงที่สมจริง และฟีเจอร์โบนัสที่หลากหลาย ทุกเกมถูกออกแบบมาให้เล่นได้ทั้งบนคอมพิวเตอร์และมือถือ รองรับทั้ง iOS และ Android

เกมเด่นของ PG Soft ที่ต้องลอง ได้แก่ Mahjong Ways ซีรีส์ ที่มีทั้ง Mahjong Ways, Mahjong Ways 2 และ Mahjong Ways 3 เป็นเกมธีมไพ่นกกระจอกที่มี Wild พิเศษช่วยเพิ่มโอกาสชนะ Fortune Tiger เกมสล็อต 3x3 ที่เล่นง่ายแต่แจกหนัก Lucky Neko เกมธีมแมวนำโชคญี่ปุ่นที่มีฟีเจอร์ Mega Win และ Dragon Hatch เกมธีมมังกรที่มีกราฟิกสวยงามและ RTP สูงถึง 96.83%

PG Soft ได้รับใบอนุญาตจาก Malta Gaming Authority (MGA) และ Gibraltar Gambling Commissioner ซึ่งเป็นหน่วยงานกำกับดูแลที่เข้มงวดที่สุดในอุตสาหกรรม ทำให้มั่นใจได้ว่าทุกเกมมีความยุติธรรมและโปร่งใส

เล่นเกม PG Soft ทั้งหมดได้ที่ RGB789 พร้อมทดลองเล่นฟรีก่อนเดิมพันจริง สมัครสมาชิกวันนี้รับโบนัสพิเศษทันที`,
  },
  // ===== คาสิโนสด =====
  {
    id: "casino-live-guide",
    category: "casino",
    title: "คาสิโนสดออนไลน์ คู่มือฉบับสมบูรณ์ เล่นอย่างไรให้ได้เงินจริง",
    excerpt: "เรียนรู้ทุกอย่างเกี่ยวกับคาสิโนสด ตั้งแต่วิธีเล่น เกมยอดนิยม เทคนิคการเดิมพัน และค่ายที่ดีที่สุดในปี 2567",
    readTime: "9 นาที",
    icon: Tv,
    tag: "คู่มือ",
    content: `คาสิโนสดออนไลน์ (Live Casino) คือรูปแบบการเล่นคาสิโนที่ถ่ายทอดสดจากสตูดิโอจริง มีดีลเลอร์สาวสวยคอยแจกไพ่และดำเนินเกมให้แบบเรียลไทม์ ผู้เล่นสามารถเห็นทุกขั้นตอนผ่านกล้อง HD คมชัด พร้อมโต้ตอบกับดีลเลอร์ผ่านระบบแชทสด ทำให้ได้รับประสบการณ์เสมือนนั่งเล่นในคาสิโนจริงๆ ที่ RGB789 เรารวบรวม <a href="#casino" style="color: #FFD700; text-decoration: underline;">คาสิโนสดออนไลน์</a> จากค่ายชั้นนำกว่าทั่วโลกรบทุกค่าย

เกมคาสิโนสดยอดนิยมที่ RGB789 ได้แก่ บาคาร่า (Baccarat) เกมไพ่ที่ได้รับความนิยมสูงสุดในเอเชีย กติกาง่าย เลือกเดิมพันฝั่งผู้เล่นหรือแบงค์เกอร์ อัตราจ่าย 1:1 รูเล็ต (Roulette) เกมวงล้อหมุนที่มีหลายรูปแบบ ทั้งยุโรป อเมริกัน และฝรั่งเศส ไฮโล (Sic Bo) เกมลูกเต๋าสามลูกที่คนไทยคุ้นเคย เดิมพันได้หลากหลายรูปแบบ แบล็คแจ็ค (Blackjack) เกมไพ่ 21 แต้มที่ต้องใช้ทั้งกลยุทธ์และโชค และ เสือมังกร (Dragon Tiger) เกมไพ่ที่เล่นง่ายที่สุด เลือกฝั่งเสือหรือมังกร

ค่ายคาสิโนสดชั้นนำที่ RGB789 ให้บริการ ได้แก่ SA Gaming ค่ายคาสิโนสดอันดับ 1 ในเอเชีย มีดีลเลอร์สาวสวยมากที่สุด ห้องเดิมพันหลากหลาย ตั้งแต่ขั้นต่ำ 10 บาท ถึงหลักแสน Sexy Gaming (AE Sexy) ค่ายที่โดดเด่นด้วยดีลเลอร์สาวเซ็กซี่ในชุดบิกินี่ บรรยากาศสนุกสนาน Pretty Gaming ค่ายคาสิโนสดสัญชาติไทย ดีลเลอร์พูดไทยได้ เข้าใจง่าย Dream Gaming ค่ายคาสิโนสดระดับพรีเมียม กราฟิกคมชัด 4K และ WM Casino ค่ายเก่าแก่ที่มีความน่าเชื่อถือสูง

เทคนิคการเล่นคาสิโนสดให้ได้กำไร ข้อแรกคือเลือกห้องที่เหมาะกับงบประมาณ ไม่ควรเข้าห้อง VIP ถ้าเงินทุนไม่พร้อม ข้อสองคือจดบันทึกสถิติ โดยเฉพาะบาคาร่า การดูเค้าไพ่ (Road Map) ช่วยให้ตัดสินใจได้ดีขึ้น ข้อสามคือตั้งเป้าหมายกำไรและขาดทุนก่อนเริ่มเล่น เมื่อถึงเป้าต้องหยุดทันที ข้อสี่คือหลีกเลี่ยงการเดิมพันแบบ Tie (เสมอ) ในบาคาร่า เพราะมี House Edge สูงถึง 14.36%

สมัครสมาชิก RGB789 วันนี้ เล่น <a href="#casino" style="color: #FFD700; text-decoration: underline;">คาสิโนสดสด</a> จากทุกค่ายดัง พร้อมรับโบนัสต้อนรับสมาชิกใหม่ ฝาก-ถอนออโต้ภายใน 30 วินาที บริการตลอด 24 ชั่วโมง`,
  },
  {
    id: "baccarat-strategy",
    category: "casino",
    title: "สูตรบาคาร่า 2567 เทคนิคอ่านเค้าไพ่ที่มือโปรใช้จริง",
    excerpt: "เปิดเผยสูตรบาคาร่าและเทคนิคอ่านเค้าไพ่แบบมืออาชีพ พร้อมกลยุทธ์บริหารเงินทุนเพื่อเพิ่มโอกาสชนะ",
    readTime: "8 นาที",
    icon: Dice1,
    tag: "เทคนิค",
    content: `บาคาร่า (Baccarat) เป็นเกมคาสิโนสดที่ได้รับความนิยมสูงสุดในประเทศไทยและทั่วเอเชีย ด้วยกติกาที่เรียบง่ายแต่ลุ้นระทึก ทำให้ผู้เล่นทั้งมือใหม่และมือโปรหลงใหลในเกมนี้ ที่ RGB789 เรามีห้องบาคาร่าสดมากกว่า 200 ห้อง จากค่ายชั้นนำ SA Gaming, Sexy Gaming, Pretty Gaming และอีกมากมาย

การอ่านเค้าไพ่ (Road Map) เป็นทักษะสำคัญที่ผู้เล่นบาคาร่ามืออาชีพต้องเรียนรู้ เค้าไพ่หลักๆ มี 5 แบบ ได้แก่ เค้าไพ่ใหญ่ (Big Road) แสดงผลลัพธ์ของแต่ละรอบเป็นวงกลมสีแดง (แบงค์เกอร์) และสีน้ำเงิน (ผู้เล่น) เค้าไพ่เล็ก (Bead Plate) แสดงผลลัพธ์เรียงตามลำดับ เค้าไพ่ตาราง (Big Eye Boy) วิเคราะห์ความสม่ำเสมอของผลลัพธ์ เค้าไพ่แถบ (Small Road) คล้าย Big Eye Boy แต่ข้ามคอลัมน์ถัดไป และ เค้าไพ่แมลงสาบ (Cockroach Pig) วิเคราะห์รูปแบบที่ซับซ้อนที่สุด

สูตรบาคาร่าที่นิยมใช้ สูตรที่ 1 คือ สูตรมาร์ติงเกล (Martingale) เพิ่มเงินเดิมพันเป็น 2 เท่าทุกครั้งที่แพ้ เมื่อชนะจะได้ทุนคืนพร้อมกำไร เหมาะกับผู้เล่นที่มีทุนหนา สูตรที่ 2 คือ สูตรพาโรลี (Paroli) เพิ่มเงินเดิมพันเป็น 2 เท่าเมื่อชนะ ติดต่อกัน 3 ครั้งแล้วกลับมาเดิมพันขั้นต่ำ เหมาะกับผู้เล่นที่ต้องการควบคุมความเสี่ยง สูตรที่ 3 คือ สูตร 1-3-2-6 เดิมพันตามลำดับ 1, 3, 2, 6 หน่วย เมื่อชนะครบ 4 ครั้งจะได้กำไร 12 หน่วย แพ้เมื่อไหร่กลับมาเริ่มต้นใหม่

กลยุทธ์บริหารเงินทุนสำหรับบาคาร่า ควรแบ่งเงินทุนเป็น 20-30 ส่วน แต่ละส่วนคือเงินเดิมพัน 1 รอบ ไม่ควรเดิมพันเกิน 5% ของเงินทุนทั้งหมดในรอบเดียว ตั้งเป้ากำไร 20-30% ของเงินทุน เมื่อถึงเป้าให้หยุดเล่น ตั้งจุดตัดขาดทุนที่ 50% ของเงินทุน หากขาดทุนถึงจุดนี้ให้หยุดทันที

เล่นบาคาร่าสดได้ที่ RGB789 มีห้องเดิมพันตั้งแต่ขั้นต่ำ 10 บาท ถึงหลักแสน พร้อมดีลเลอร์สาวสวยจากค่ายดังทั่วโลก สมัครสมาชิกวันนี้รับโบนัสพิเศษทันที`,
  },
  // ===== แทงบอล =====
  {
    id: "football-betting-guide",
    category: "sports",
    title: "แทงบอลออนไลน์ คู่มือฉบับสมบูรณ์สำหรับมือใหม่ 2567",
    excerpt: "เรียนรู้วิธีแทงบอลออนไลน์ตั้งแต่พื้นฐาน ประเภทการเดิมพัน อ่านราคาบอล และเทคนิคเพิ่มโอกาสชนะ",
    readTime: "10 นาที",
    icon: Trophy,
    tag: "คู่มือ",
    content: `แทงบอลออนไลน์ เป็นรูปแบบการเดิมพันกีฬาที่ได้รับความนิยมมากที่สุดในประเทศไทยและทั่วโลก ด้วยความตื่นเต้นของการแข่งขันฟุตบอลจากลีกชั้นนำ ไม่ว่าจะเป็น พรีเมียร์ลีก ลาลีกา เซเรียอา บุนเดสลีกา ลีกเอิง แชมเปียนส์ลีก และฟุตบอลโลก ที่ RGB789 เรามีราคาบอลที่ดีที่สุด ครบทุกลีก ทุกคู่ จากผู้ให้บริการชั้นนำ

ประเภทการแทงบอลที่ต้องรู้ แบบที่ 1 คือ บอลเดี่ยว (Single Bet) เดิมพันเพียงคู่เดียว เหมาะสำหรับมือใหม่ที่ต้องการความเสี่ยงต่ำ แบบที่ 2 คือ บอลสเต็ป (Parlay/Accumulator) เดิมพันหลายคู่รวมกัน ต้องถูกทุกคู่จึงจะได้เงิน แต่ราคาจ่ายสูงมาก แบบที่ 3 คือ บอลสด (Live Betting/In-Play) เดิมพันระหว่างการแข่งขัน ราคาเปลี่ยนแปลงตลอดเวลาตามสถานการณ์ในสนาม แบบที่ 4 คือ บอลครึ่งแรก/ครึ่งหลัง เดิมพันเฉพาะผลครึ่งแรกหรือครึ่งหลัง แบบที่ 5 คือ สูง/ต่ำ (Over/Under) เดิมพันจำนวนประตูรวมของทั้งสองทีม

วิธีอ่านราคาบอล (Odds) ราคาบอลแบบฮ่องกง (HK Odds) เป็นที่นิยมในเอเชีย แสดงเป็นทศนิยม เช่น 0.85 หมายถึงเดิมพัน 100 ได้กำไร 85 ราคาต่อ/รอง (Handicap) ทีมที่แข็งกว่าจะต่อราคาให้ทีมที่อ่อนกว่า เช่น ทีม A ต่อ 0.5-1 หมายถึงทีม A ต่อให้ครึ่งลูกถึงหนึ่งลูก ราคาสูง/ต่ำ (Over/Under) เช่น สูง/ต่ำ 2.5 หมายถึงถ้าประตูรวมมากกว่า 2.5 (3 ประตูขึ้นไป) ฝั่งสูงชนะ

ผู้ให้บริการแทงบอลที่ RGB789 ได้แก่ SBOBET ผู้ให้บริการแทงบอลอันดับ 1 ของเอเชีย ราคาดีที่สุด CMD Sports ราคาบอลหลากหลาย อัปเดตเร็ว WS Sports ระบบเสถียร รองรับบอลสด SABA Sports ครบทุกลีก ทั่วโลก IM Sports อินเทอร์เฟซใช้งานง่าย และ UG Sports ราคาบอลแข่งขันได้

สมัครสมาชิก RGB789 วันนี้ <a href="#sports" style="color: #FFD700; text-decoration: underline;">แทงบอลออนไลน์</a> ราคาดีที่สุด ครบทุกลีก ทุกคู่ ฝาก-ถอนออโต้ภายใน 30 วินาที พร้อมรับโบนัสทุกยอดฝาก 2% ทุกวัน`,
  },
  {
    id: "football-betting-tips",
    category: "sports",
    title: "เทคนิคแทงบอลให้ได้กำไร สูตรวิเคราะห์บอลแบบมืออาชีพ",
    excerpt: "เปิดเผยเทคนิควิเคราะห์บอลและกลยุทธ์การเดิมพันที่นักแทงบอลมืออาชีพใช้จริง เพิ่มโอกาสชนะอย่างมีระบบ",
    readTime: "8 นาที",
    icon: Target,
    tag: "เทคนิค",
    content: `การแทงบอลให้ได้กำไรอย่างยั่งยืนนั้น ไม่ได้ขึ้นอยู่กับโชคเพียงอย่างเดียว แต่ต้องอาศัยการวิเคราะห์ข้อมูลอย่างเป็นระบบ ที่ RGB789 เราได้รวบรวมเทคนิคจากนักวิเคราะห์บอลมืออาชีพมาแบ่งปันให้กับสมาชิกทุกท่าน

เทคนิคที่ 1 คือการวิเคราะห์ฟอร์มทีม (Form Analysis) ดูผลการแข่งขัน 5-10 นัดล่าสุดของทั้งสองทีม ทีมที่ฟอร์มดีมักจะมีโมเมนตัมในการชนะต่อเนื่อง นอกจากนี้ยังต้องดูว่าฟอร์มดีในบ้านหรือนอกบ้าน เพราะบางทีมเก่งเฉพาะเล่นในบ้าน

เทคนิคที่ 2 คือการวิเคราะห์สถิติ Head-to-Head ดูประวัติการพบกันของทั้งสองทีมย้อนหลัง 5-10 ครั้ง บางทีมอาจมีสถิติชนะคู่แข่งบางทีมเป็นประจำ ข้อมูลนี้ช่วยให้ตัดสินใจได้แม่นยำขึ้น

เทคนิคที่ 3 คือการติดตามข่าวนักเตะ ข่าวบาดเจ็บ การพักการแข่งขัน หรือการย้ายทีมของนักเตะตัวหลัก มีผลอย่างมากต่อผลการแข่งขัน ผู้เล่นที่ติดตามข่าวสารอย่างใกล้ชิดจะได้เปรียบในการเดิมพัน

เทคนิคที่ 4 คือการดูค่าน้ำ (Odds Movement) การเปลี่ยนแปลงของราคาบอลบอกถึงแนวโน้มที่ตลาดมองเห็น ถ้าราคาต่อลดลง แสดงว่ามีเงินเดิมพันเข้ามาฝั่งทีมต่อมาก อาจเป็นสัญญาณว่าทีมต่อมีโอกาสชนะสูง

เทคนิคที่ 5 คือการเลือกแทงบอลสด (Live Betting) อย่างชาญฉลาด การดูเกมสดช่วยให้เห็นจังหวะการเล่นจริง บางครั้งทีมที่เสียประตูก่อนอาจกลับมาชนะได้ ถ้าเห็นว่าเกมเปิดและมีโอกาสทำประตู การแทงสดในจังหวะที่ราคาดีจะให้ผลตอบแทนสูง
เทคนิคที่ 6 คือการบริหารเงินทุน (Bankroll Management) ไม่ควรรแทงเกิน 5% ของเงินทุนทั้งหมดในคู่เดิยว สำหรับบอลสเต็ป ไม่ควรรเกิน 2% หลีกเลียงการแทงตามอารมณ์หรือแทงเพื่อตามทุนคืน ตั้งเป้ากำไรรายวันและรายสัปดาห์ เมื่อถึงเป้าให้หยุดเล่น

แทงบอลออนไลน์ที่ RGB789 ราคาดีที่สุด ครบทุกลีกทั่วโลก พร้อมสถิติและข้อมูลวิเคราะห์บอลครบครัว ดูเพิ่มเติมที่ <a href="#sports" style="color: #FFD700; text-decoration: underline;">หมวดแทงบอล</a> สมัครสมาชิกวันนี้รับโบนัสทุกยอดฝาก 2% ทุกวัน`
  },
];

export default function ArticlesSection() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filteredArticles = activeTab === "all"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeTab);

  return (
    <section className="py-16 lg:py-24 relative" id="articles">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(255,215,0,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
            style={{
              borderColor: "rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.08)",
            }}
          >
            <BookOpen size={14} className="text-purple-400" />
            <span className="text-xs font-medium text-purple-300 tracking-wider uppercase"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              บทความ & ความรู้
            </span>
          </div>

          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Kanit', sans-serif" }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC107, #FFE066)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              บทความแนะนำ
            </span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm lg:text-base leading-relaxed">
            รวมบทความความรู้เกี่ยวกับเกมสล็อตออนไลน์ คาสิโนสด แทงบอล เทคนิคการเล่น
            รีวิวค่ายเกม และคู่มือสำหรับผู้เล่นทุกระดับ
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setExpandedArticle(null); }}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  background: activeTab === tab.key
                    ? "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)"
                    : "rgba(139,92,246,0.1)",
                  color: activeTab === tab.key ? "#1a0533" : "rgba(255,255,255,0.6)",
                  border: activeTab === tab.key
                    ? "1px solid rgba(255,215,0,0.5)"
                    : "1px solid rgba(139,92,246,0.2)",
                  boxShadow: activeTab === tab.key ? "0 0 15px rgba(255,215,0,0.2)" : "none",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {filteredArticles.map((article, index) => {
            const IconComponent = article.icon;
            const isExpanded = expandedArticle === article.id;

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(30,15,60,0.8) 0%, rgba(20,8,45,0.9) 100%)",
                  border: "1px solid rgba(139,92,246,0.15)",
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.1) 0%, transparent 70%)",
                  }}
                />

                <div className="relative p-6 lg:p-8">
                  {/* Tag & Read Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        fontFamily: "'Kanit', sans-serif",
                        background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(245,158,11,0.1))",
                        color: "#FFD700",
                        border: "1px solid rgba(255,215,0,0.2)",
                      }}
                    >
                      <IconComponent size={12} />
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg lg:text-xl font-bold text-white/95 mb-3 group-hover:text-yellow-400 transition-colors duration-300 leading-snug"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                  >
                    <span className="hover:text-yellow-400 transition-colors cursor-pointer">
                      {article.title}
                    </span>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t" style={{ borderColor: "rgba(139,92,246,0.15)" }}>
                      {article.content.split("\n\n").map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-white/60 text-sm leading-relaxed mb-4"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {/* CTA inside article */}
                      <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(139,92,246,0.1)" }}>
                        <a
                          href={SITE_INFO.registerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105"
                          style={{
                            fontFamily: "'Kanit', sans-serif",
                            background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                            color: "#1a0533",
                            boxShadow: "0 0 15px rgba(255,215,0,0.2)",
                          }}
                        >
                          <Zap size={14} />
                          ทดลองเล่นฟรีที่ RGB789
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Read More & Share Buttons */}
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => {
                        setExpandedArticle(isExpanded ? null : article.id);
                      }}
                      className="flex items-center gap-1.5 text-sm font-medium text-purple-400 hover:text-yellow-400 transition-colors duration-300"
                      style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                      {isExpanded ? "ย่อบทความ" : "อ่านเพิ่มเติม"}
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Share Buttons */}
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 text-xs mr-1 hidden sm:inline">แชร์</span>
                      {/* Facebook Share */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_ORIGIN + "/#" + article.id)}&quote=${encodeURIComponent(article.title + " - RGB789")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/share inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110"
                        style={{
                          background: "rgba(24,119,242,0.15)",
                          border: "1px solid rgba(24,119,242,0.25)",
                        }}
                        title="แชร์ไปยัง Facebook"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#1877F2] group-hover/share:text-white transition-colors duration-300"
                        >
                          <path
                            d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>

                      {/* LINE Share */}
                      <a
                        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(CANONICAL_ORIGIN + "/#" + article.id)}&text=${encodeURIComponent(article.title + " - RGB789")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/share inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110"
                        style={{
                          background: "rgba(6,199,85,0.15)",
                          border: "1px solid rgba(6,199,85,0.25)",
                        }}
                        title="แชร์ไปยัง LINE"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#06C755] group-hover/share:text-white transition-colors duration-300"
                        >
                          <path
                            d="M24 10.304C24 4.616 18.627 0 12 0C5.373 0 0 4.616 0 10.304C0 15.404 4.27 19.72 10.035 20.476C10.406 20.558 10.92 20.728 11.04 21.056C11.148 21.354 11.112 21.82 11.076 22.116L10.932 23.01C10.884 23.31 10.692 24.168 12 23.586C13.308 23.004 18.894 19.544 21.396 16.672C23.124 14.772 24 12.634 24 10.304ZM7.848 13.236C7.848 13.428 7.692 13.584 7.5 13.584H4.464C4.272 13.584 4.116 13.428 4.116 13.236V7.776C4.116 7.584 4.272 7.428 4.464 7.428H5.16C5.352 7.428 5.508 7.584 5.508 7.776V12.192H7.5C7.692 12.192 7.848 12.348 7.848 12.54V13.236ZM9.744 13.236C9.744 13.428 9.588 13.584 9.396 13.584H8.7C8.508 13.584 8.352 13.428 8.352 13.236V7.776C8.352 7.584 8.508 7.428 8.7 7.428H9.396C9.588 7.428 9.744 7.584 9.744 7.776V13.236ZM15.084 13.236C15.084 13.428 14.928 13.584 14.736 13.584H14.04C13.98 13.584 13.92 13.572 13.872 13.548L11.34 10.116V13.236C11.34 13.428 11.184 13.584 10.992 13.584H10.296C10.104 13.584 9.948 13.428 9.948 13.236V7.776C9.948 7.584 10.104 7.428 10.296 7.428H10.992C11.052 7.428 11.112 7.44 11.16 7.464L13.692 10.896V7.776C13.692 7.584 13.848 7.428 14.04 7.428H14.736C14.928 7.428 15.084 7.584 15.084 7.776V13.236ZM19.884 8.82C19.884 9.012 19.728 9.168 19.536 9.168H17.544V10.164H19.536C19.728 10.164 19.884 10.32 19.884 10.512V11.208C19.884 11.4 19.728 11.556 19.536 11.556H17.544V12.54H19.536C19.728 12.54 19.884 12.696 19.884 12.888V13.584C19.884 13.776 19.728 13.932 19.536 13.932H16.5C16.308 13.932 16.152 13.776 16.152 13.584V7.776C16.152 7.584 16.308 7.428 16.5 7.428H19.536C19.728 7.428 19.884 7.584 19.884 7.776V8.82Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom SEO Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: "linear-gradient(135deg, rgba(30,15,60,0.5) 0%, rgba(20,8,45,0.6) 100%)",
              border: "1px solid rgba(139,92,246,0.1)",
            }}
          >
            <h3
              className="text-xl lg:text-2xl font-bold mb-4"
              style={{ fontFamily: "'Kanit', sans-serif" }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #FFD700, #FFC107)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ทำไมต้องเล่นสล็อตที่ RGB789?
              </span>
            </h3>
            <div className="space-y-4 text-white/55 text-sm leading-relaxed">
              <p>
                <strong className="text-white/85">RGB789</strong> เป็นเว็บสล็อตออนไลน์ที่รวบรวมเกมจากค่ายชั้นนำทั่วโลกไว้มากกว่า 500 เกม ไม่ว่าจะเป็น{" "}
                <strong className="text-white/85">PG Soft, Pragmatic Play, Joker Gaming, Spadegaming, CQ9, JILI</strong>{" "}
                และอีกมากมาย ทุกเกมมีอัตรา RTP สูง โบนัสแตกบ่อย พร้อมระบบทดลองเล่นฟรีก่อนเดิมพันจริง
              </p>
              <p>
                สมาชิก RGB789 ทุกท่านจะได้รับสิทธิพิเศษมากมาย ไม่ว่าจะเป็น{" "}
                <strong className="text-white/85">โบนัสต้อนรับสมาชิกใหม่ ทุกยอดฝากรับ 2% ทุกวัน คืนยอดเสียทุกสัปดาห์</strong>{" "}
                ระบบฝาก-ถอนออโต้ภายใน 30 วินาที รองรับทุกธนาคารและ TrueMoney Wallet บริการตลอด 24 ชั่วโมง
              </p>
              <p>
                นอกจากเกมสล็อตแล้ว RGB789 ยังมี{" "}
                <strong className="text-white/85">คาสิโนสด แทงบอลออนไลน์ เกมยิงปลา โต๊ะเกม</strong>{" "}
                ครบทุกประเภทเกมพนันออนไลน์ในเว็บเดียว สมัครสมาชิกง่ายภายใน 3 นาที เริ่มเล่นได้ทันที
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={SITE_INFO.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  background: "linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)",
                  color: "#1a0533",
                  boxShadow: "0 0 20px rgba(255,215,0,0.25)",
                }}
              >
                สมัครสมาชิก RGB789
                <ChevronRight size={16} />
              </a>
              <a
                href={SITE_INFO.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white/80 border transition-all duration-300 hover:bg-white/5 hover:text-white"
                style={{
                  fontFamily: "'Kanit', sans-serif",
                  borderColor: "rgba(139,92,246,0.3)",
                }}
              >
                สอบถามเพิ่มเติม LINE
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
