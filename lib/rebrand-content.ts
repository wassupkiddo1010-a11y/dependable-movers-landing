import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site-config";

/** Replace United Global Vanline branding with Dependable Movers. */
export function rebrand(text: string): string {
  return text
    .replace(/United Global Van Lines?/gi, SITE_NAME)
    .replace(/United Global Vanline/gi, SITE_NAME)
    .replace(/support@unitedglobalvanline\.com/gi, SITE_EMAIL)
    .replace(/legal@unitedglobalvanline\.com/gi, SITE_EMAIL)
    .replace(/www\.unitedglobalvanline\.com/gi, SITE_URL.replace(/^https?:\/\//, ""))
    .replace(/unitedglobalvanline\.com/gi, "dependablemovers.com");
}
