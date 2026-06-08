import type { MetadataRoute } from "next";
import { SITEMAP_ENTRIES, absoluteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ENTRIES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
