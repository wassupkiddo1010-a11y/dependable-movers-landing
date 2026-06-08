import type { ContentBlock } from "@/data/pages/types";

export function PageBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index} className="leading-relaxed">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={index} className="pt-2 text-xl font-bold text-[#1A1A1A]">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="pt-1 text-lg font-semibold text-[#16335B]">
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
          case "testimonial":
            return (
              <blockquote
                key={index}
                className="rounded-xl border border-[#16335B]/10 bg-[#f4f6f9] px-5 py-4 not-italic"
              >
                <p className="text-[#555555]">&ldquo;{block.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-[#16335B]">
                  — {block.author}
                </footer>
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
