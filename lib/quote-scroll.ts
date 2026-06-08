export const QUOTE_SECTION_ID = "consultation";

const QUOTE_SCROLL_STORAGE_KEY = "dependable-scroll-to-quote";

export function markQuoteScrollIntent(): void {
  try {
    sessionStorage.setItem(QUOTE_SCROLL_STORAGE_KEY, "1");
  } catch {
    /* sessionStorage unavailable */
  }
}

export function scrollToQuoteSection(
  behavior: ScrollBehavior = "smooth"
): boolean {
  if (typeof document === "undefined") return false;
  const section = document.getElementById(QUOTE_SECTION_ID);
  if (!section) return false;
  section.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function consumeQuoteScrollIntent(): boolean {
  if (typeof sessionStorage === "undefined") return false;
  const shouldScroll = sessionStorage.getItem(QUOTE_SCROLL_STORAGE_KEY) === "1";
  if (shouldScroll) {
    sessionStorage.removeItem(QUOTE_SCROLL_STORAGE_KEY);
  }
  return shouldScroll;
}
