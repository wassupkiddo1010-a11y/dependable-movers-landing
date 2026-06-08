import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const normalizedPath = path === "/" ? "" : path.replace(/^\//, "");
  const url = normalizedPath
    ? `${base}/${normalizedPath}${normalizedPath.endsWith("/") ? "" : "/"}`
    : `${base}/`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
