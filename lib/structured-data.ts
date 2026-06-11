import { NAV_LINKS, absoluteUrl } from "@/lib/routes";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site-config";

function siteBase(): string {
  return SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
}

export function organizationJsonLd() {
  const base = siteBase();

  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${base}/#organization`,
    name: SITE_NAME,
    url: `${base}/`,
    logo: `${base}/assets/logo.png`,
    image: `${base}/assets/logo.png`,
    description: SITE_TAGLINE,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.line1,
      addressLocality: "Port Saint Lucie",
      addressRegion: "FL",
      postalCode: "34952",
      addressCountry: "US",
    },
  };
}

export function websiteJsonLd() {
  const base = siteBase();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: SITE_NAME,
    url: `${base}/`,
    description: SITE_TAGLINE,
    publisher: { "@id": `${base}/#organization` },
  };
}

export function siteNavigationJsonLd() {
  const base = siteBase();

  return NAV_LINKS.filter((link) => link.href !== "/").map((link, index) => {
    const path = link.href.replace(/^\//, "").replace(/\/$/, "");

    return {
      "@context": "https://schema.org",
      "@type": "SiteNavigationElement",
      "@id": `${base}/#nav-${index}`,
      name: link.label,
      url: absoluteUrl(path),
    };
  });
}

export function rootStructuredData(): Record<string, unknown>[] {
  return [organizationJsonLd(), websiteJsonLd(), ...siteNavigationJsonLd()];
}
