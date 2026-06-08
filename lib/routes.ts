import { SITE_URL } from "@/lib/site-config";

/** All public marketing routes (trailing slash). */
export const ROUTES = {
  home: "/",
  about: "/about/",
  services: "/services/",
  areasWeServe: "/areas-we-serve/",
  contact: "/contact/",
  preferredCarriers: "/preferred-carriers/",
  privacyPolicy: "/privacy-policy/",
  termsAndConditions: "/terms-and-conditions/",
  quote: "/",
  service: (slug: string) => `/services/${slug}/`,
} as const;

export const SERVICE_SLUGS = [
  "local-moving",
  "long-distance-moving",
  "commercial-moving",
  "furniture-moving",
  "piano-moving",
  "last-second-moves",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const NAV_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Services", href: ROUTES.services },
  { label: "Areas We Serve", href: ROUTES.areasWeServe },
  { label: "Contact", href: ROUTES.contact },
] as const;

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
};

/** Paths relative to site root (no leading slash on empty = home). */
export const SITEMAP_ENTRIES: SitemapEntry[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "about", priority: 0.8, changeFrequency: "monthly" },
  { path: "services", priority: 0.9, changeFrequency: "monthly" },
  ...SERVICE_SLUGS.map((slug) => ({
    path: `services/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "areas-we-serve", priority: 0.8, changeFrequency: "monthly" },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "preferred-carriers", priority: 0.5, changeFrequency: "monthly" },
  { path: "privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
];

export function absoluteUrl(path: string): string {
  const normalized = path === "" || path === "/" ? "" : path.replace(/^\//, "");
  if (!normalized) return SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const segment = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${base}/${segment}`;
}
