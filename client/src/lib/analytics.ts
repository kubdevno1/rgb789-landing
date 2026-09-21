/**
 * Google Tag Manager event utility
 * ส่ง conversion events เข้า dataLayer เพื่อให้ GTM จัดการปลายทางเพียงจุดเดียว
 */

type DataLayerEvent = Record<string, string | number | boolean> & {
  event: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * ส่ง custom event เข้า Google Tag Manager dataLayer
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
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

/**
 * ติดตามการ swipe carousel
 */
export function trackCarouselSwipe(carouselName: string, direction: "left" | "right", currentIndex: number) {
  trackEvent("carousel_swipe", {
    event_category: "engagement",
    carousel_name: carouselName,
    swipe_direction: direction,
    item_index: currentIndex,
  });
}

/**
 * ติดตามการคลิกรูปภาพใน gallery
 */
export function trackGalleryImageClick(galleryName: string, imageIndex: number) {
  trackEvent("gallery_image_click", {
    event_category: "engagement",
    gallery_name: galleryName,
    image_index: imageIndex,
  });
}

/**
 * ติดตามการเปิด lightbox
 */
export function trackLightboxOpen(galleryName: string, imageIndex: number) {
  trackEvent("lightbox_open", {
    event_category: "engagement",
    gallery_name: galleryName,
    image_index: imageIndex,
  });
}

/**
 * ติดตามการปิด lightbox
 */
export function trackLightboxClose(galleryName: string) {
  trackEvent("lightbox_close", {
    event_category: "engagement",
    gallery_name: galleryName,
  });
}

/**
 * ติดตามการคลิกลิงค์ในบทความ
 */
export function trackArticleLink(articleTitle: string, linkUrl: string) {
  trackEvent("article_link_click", {
    event_category: "content",
    event_label: articleTitle,
    link_url: linkUrl,
  });
}

/**
 * ติดตามการคลิก FAQ accordion
 */
export function trackFaqClick(question: string, isOpen: boolean) {
  trackEvent("faq_click", {
    event_category: "engagement",
    event_label: question,
    is_open: isOpen,
  });
}

/**
 * ติดตามการคลิกปุ่มอ่านเพิ่มเติม
 */
export function trackReadMoreClick(articleTitle: string, location: string) {
  trackEvent("read_more_click", {
    event_category: "content",
    event_label: articleTitle,
    button_location: location,
  });
}
