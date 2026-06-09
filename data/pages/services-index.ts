import type { MigratedPage } from "@/data/pages/types";
import { quoteFormBlock } from "@/data/pages/shared-blocks";

export const servicesIndexPage: MigratedPage = {
  title: "Our Services",
  description:
    "Stress-free local, long-distance, commercial, and specialty moving services at affordable prices.",
  blocks: [
    { type: "serviceRail" },
    quoteFormBlock,
    {
      type: "testimonial",
      headline: "Excellent Job",
      quote:
        "I was really worried about moving my vintage furniture across the country without tarnishing anything, but Dependable Movers ensured that everything reached its destination without a single bump or scratch. Really amazed by their services!",
      author: "Jenny J.",
    },
  ],
};
