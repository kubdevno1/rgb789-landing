/**
 * Google Analytics Event Tracking Utility
 * ใช้สำหรับติดตาม conversion events ต่างๆ บนเว็บไซต์ RGB789
 */

// ประกาศ type สำหรับ gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * ส่ง custom event ไปยัง Google Analytics
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

/**
 * ติดตามการคลิกปุ่มสมัครสมาชิก
 */
export function trackRegisterClick(location: string) {
  trackEvent("sign_up_click", {
    event_category: "conversion",
    event_label: location,
    button_location: location,
  });
}

/**
 * ติดตามการคลิกปุ่มเข้าสู่ระบบ
 */
export function trackLoginClick(location: string) {
  trackEvent("login_click", {
    event_category: "engagement",
    event_label: location,
    button_location: location,
  });
}

/**
 * ติดตามการคลิกปุ่มเล่นเกม
 */
export function trackPlayGameClick(gameCategory: string, location: string) {
  trackEvent("play_game_click", {
    event_category: "engagement",
    event_label: gameCategory,
    game_category: gameCategory,
    button_location: location,
  });
}

/**
 * ติดตามการคลิกติดต่อ LINE
 */
export function trackLineContactClick(location: string) {
  trackEvent("line_contact_click", {
    event_category: "engagement",
    event_label: location,
    button_location: location,
  });
}

/**
 * ติดตามการแชร์บทความ
 */
export function trackArticleShare(platform: string, articleTitle: string) {
  trackEvent("share", {
    method: platform,
    content_type: "article",
    item_id: articleTitle,
  });
}

/**
 * ติดตามการอ่านบทความ
 */
export function trackArticleRead(articleTitle: string, category: string) {
  trackEvent("article_read", {
    event_category: "content",
    event_label: articleTitle,
    article_category: category,
  });
}
