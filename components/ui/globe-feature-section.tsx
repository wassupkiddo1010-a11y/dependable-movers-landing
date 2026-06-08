"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { AREAS_WE_SERVE_STATES } from "@/data/areas-we-serve";
import {
  AREAS_GLOBE_CONNECTIONS,
  AREAS_GLOBE_MARKERS,
} from "@/data/areas-globe";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { cn } from "@/lib/utils";

function StateItem({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <ArrowRight
        className="h-4 w-4 shrink-0 text-[#ED7D22]"
        strokeWidth={2.5}
        aria-hidden
      />
      <span className="font-plus-jakarta text-[15px] font-medium text-[#374151]">
        {name}
      </span>
    </li>
  );
}

export function AreasWeServeGlobeSection({
  className,
  ctaHref = "/areas-we-serve/",
}: {
  className?: string;
  ctaHref?: string;
}) {
  return (
    <section
      id="areas-we-serve"
      aria-labelledby="areas-section-heading"
      className={cn(
        "relative scroll-mt-24 bg-[#f9f9f9] px-[max(6vw,40px)] py-16 md:py-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="areas-section-heading"
          className="font-plus-jakarta mb-10 text-center text-[clamp(28px,4vw,40px)] font-extrabold uppercase tracking-tight text-[#1A1A1A] md:mb-12"
        >
          Areas We Serve
        </h2>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative mx-auto md:mx-0">
            <InteractiveGlobe
              size={460}
              backgroundColor="#f9f9f9"
              markers={[...AREAS_GLOBE_MARKERS]}
              connections={AREAS_GLOBE_CONNECTIONS}
              dotColor="rgba(100, 180, 255, ALPHA)"
              arcColor="rgba(100, 180, 255, 0.5)"
              markerColor="rgba(100, 220, 255, 1)"
            />
          </div>

          <div className="text-left">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:gap-x-12">
              <ul className="space-y-3">
                {AREAS_WE_SERVE_STATES.columnOne.map((state) => (
                  <StateItem key={state} name={state} />
                ))}
              </ul>
              <ul className="space-y-3">
                {AREAS_WE_SERVE_STATES.columnTwo.map((state) => (
                  <StateItem key={state} name={state} />
                ))}
              </ul>
            </div>

            <Link
              href={ctaHref}
              className="font-plus-jakarta mt-8 inline-flex items-center rounded-md bg-[#ED7D22] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#D4691A]"
            >
              View All Locations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AreasWeServeGlobeSection;
