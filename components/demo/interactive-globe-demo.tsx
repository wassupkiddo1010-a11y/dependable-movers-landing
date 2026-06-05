"use client";

import {
  AREAS_GLOBE_CONNECTIONS,
  AREAS_GLOBE_MARKERS,
} from "@/data/areas-globe";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";

export function InteractiveGlobeDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card">
        <div className="pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#16335B]/5 blur-3xl" />

        <div className="flex min-h-[500px] flex-col md:flex-row">
          <div className="relative z-10 flex flex-1 flex-col justify-center p-10 md:p-14">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Nationwide coverage
            </div>

            <h1 className="mb-4 text-3xl leading-[1.1] font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Areas We
              <br />
              <span className="bg-gradient-to-r from-[#16335B] to-[#ED7D22] bg-clip-text text-transparent">
                Serve
              </span>
            </h1>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Professional moving services across key states nationwide. Drag the
              globe to explore our service locations.
            </p>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-2xl font-bold text-foreground">9+</p>
                <p className="text-xs text-muted-foreground">States</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">50</p>
                <p className="text-xs text-muted-foreground">States Total</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          <div className="flex min-h-[400px] flex-1 items-center justify-center p-4 md:p-8">
            <InteractiveGlobe
              size={460}
              markers={[...AREAS_GLOBE_MARKERS]}
              connections={AREAS_GLOBE_CONNECTIONS}
              dotColor="rgba(100, 180, 255, ALPHA)"
              arcColor="rgba(100, 180, 255, 0.5)"
              markerColor="rgba(100, 220, 255, 1)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DemoOne() {
  return <InteractiveGlobeDemo />;
}
