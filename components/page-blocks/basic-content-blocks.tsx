import type { BasicContentBlock } from "@/data/pages/types";
import { BlockReveal } from "@/components/page-blocks/block-primitives";

export function BasicContentBlocks({ blocks }: { blocks: BasicContentBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-slate-600">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={index}
                className="pt-2 font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-[#0F172A]"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                className="pt-1 text-lg font-semibold text-[#16335B]"
              >
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={index} className="list-disc space-y-2 pl-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function BasicContentBlockSection({
  blocks,
}: {
  blocks: BasicContentBlock[];
}) {
  return (
    <BlockReveal>
      <BasicContentBlocks blocks={blocks} />
    </BlockReveal>
  );
}
