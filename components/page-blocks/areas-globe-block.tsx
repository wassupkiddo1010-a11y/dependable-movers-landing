"use client";

import dynamic from "next/dynamic";
import { BlockReveal } from "@/components/page-blocks/block-primitives";

const AreasWeServeGlobeSection = dynamic(
  () =>
    import("@/components/ui/globe-feature-section").then(
      (mod) => mod.AreasWeServeGlobeSection
    ),
  {
    loading: () => (
      <div className="mx-auto h-[320px] max-w-5xl animate-pulse rounded-3xl bg-slate-100" />
    ),
    ssr: false,
  }
);

export function AreasGlobeBlock() {
  return (
    <BlockReveal className="mx-auto w-full max-w-6xl">
      <AreasWeServeGlobeSection className="py-0" ctaHref="/areas-we-serve/" />
    </BlockReveal>
  );
}
