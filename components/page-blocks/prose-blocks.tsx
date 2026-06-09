import type { BasicContentBlock } from "@/data/pages/types";

export function ProseBlocks({ blocks }: { blocks: BasicContentBlock[] }) {
  return (
    <div className="mx-auto max-w-[70ch] space-y-5 text-[17px] leading-[1.7] text-slate-600">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{block.text}</p>;
          case "h2":
            return (
              <h2
                key={index}
                className="pt-4 font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold uppercase leading-[0.95] tracking-tight text-[#0F172A] md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={index}
                className="pt-2 text-lg font-semibold text-[#16335B]"
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
