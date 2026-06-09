"use client";

import { BlockReveal, SectionKicker } from "@/components/page-blocks/block-primitives";

type TestimonialBlockProps = {
  quote: string;
  author: string;
  headline?: string;
};

export function TestimonialBlock({
  quote,
  author,
  headline = "What Our Customers Say",
}: TestimonialBlockProps) {
  return (
    <BlockReveal className="mx-auto w-full max-w-3xl text-center">
      <SectionKicker>{headline}</SectionKicker>
      <blockquote className="relative rounded-3xl border border-slate-200 bg-slate-50 px-6 py-10 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-6 top-6 h-24 w-24 rounded-full bg-[#ED7D22]/10 blur-2xl"
        />
        <p className="relative text-lg leading-relaxed text-slate-600 md:text-xl">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="relative mt-6 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold uppercase tracking-[0.16em] text-[#0F172A]">
          — {author}
        </footer>
      </blockquote>
    </BlockReveal>
  );
}
