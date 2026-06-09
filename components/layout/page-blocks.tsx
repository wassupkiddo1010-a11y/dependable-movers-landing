"use client";

import type { ContentBlock } from "@/data/pages/types";
import { BasicContentBlockSection } from "@/components/page-blocks/basic-content-blocks";
import { AreasGlobeBlock } from "@/components/page-blocks/areas-globe-block";
import { ContactFormBlock } from "@/components/page-blocks/contact-form-block";
import { ProseBlocks } from "@/components/page-blocks/prose-blocks";
import { QuoteFormBlock } from "@/components/page-blocks/quote-form-block";
import { ServiceRailBlock } from "@/components/page-blocks/service-rail-block";
import { TestimonialBlock } from "@/components/page-blocks/testimonial-block";

function isBasicContentBlock(
  block: ContentBlock
): block is Extract<
  ContentBlock,
  { type: "p" | "h2" | "h3" | "ul" }
> {
  return (
    block.type === "p" ||
    block.type === "h2" ||
    block.type === "h3" ||
    block.type === "ul"
  );
}

function groupBasicBlocks(blocks: ContentBlock[]) {
  const groups: ContentBlock[][] = [];
  let current: ContentBlock[] = [];

  for (const block of blocks) {
    if (isBasicContentBlock(block)) {
      current.push(block);
      continue;
    }
    if (current.length) {
      groups.push(current);
      current = [];
    }
    groups.push([block]);
  }

  if (current.length) groups.push(current);
  return groups;
}

export function PageBlocks({ blocks }: { blocks: ContentBlock[] }) {
  const groups = groupBasicBlocks(blocks);

  return (
    <div className="space-y-12 md:space-y-16">
      {groups.map((group, groupIndex) => {
        if (group.length === 1) {
          const block = group[0];
          switch (block.type) {
            case "quoteForm":
              return (
                <div key={groupIndex} id="quote-form" className="scroll-mt-24">
                  <QuoteFormBlock />
                </div>
              );
            case "contactForm":
              return <ContactFormBlock key={groupIndex} />;
            case "serviceRail":
              return <ServiceRailBlock key={groupIndex} />;
            case "areasGlobe":
              return <AreasGlobeBlock key={groupIndex} />;
            case "prose":
              return (
                <div key={groupIndex} className="mx-auto max-w-[70ch]">
                  <ProseBlocks blocks={block.blocks} />
                </div>
              );
            case "testimonial":
              return (
                <TestimonialBlock
                  key={groupIndex}
                  quote={block.quote}
                  author={block.author}
                  headline={block.headline}
                />
              );
            default:
              break;
          }
        }

        const basicBlocks = group.filter(isBasicContentBlock);
        if (!basicBlocks.length) return null;

        return (
          <BasicContentBlockSection
            key={groupIndex}
            blocks={basicBlocks}
          />
        );
      })}
    </div>
  );
}
