import type { ContentBlock } from "@/data/pages/types";

export const quoteFormBlock: ContentBlock = { type: "quoteForm" };
export const contactFormBlock: ContentBlock = { type: "contactForm" };

export function withQuotePipeline(
  blocks: ContentBlock[],
  testimonial?: Extract<ContentBlock, { type: "testimonial" }>
): ContentBlock[] {
  const withoutTestimonial = blocks.filter((block) => block.type !== "testimonial");
  const testimonialBlock =
    testimonial ?? blocks.find((block) => block.type === "testimonial");

  return [
    ...withoutTestimonial,
    quoteFormBlock,
    ...(testimonialBlock ? [testimonialBlock] : []),
  ];
}
