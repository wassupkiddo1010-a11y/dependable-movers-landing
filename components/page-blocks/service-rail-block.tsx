"use client";

import Link from "next/link";
import { BlockReveal, SectionKicker } from "@/components/page-blocks/block-primitives";
import { SERVICES } from "@/data/services";

const RAIL_TESTIMONIAL = {
  quote:
    "I was really worried about moving my vintage furniture across the country without tarnishing anything, but Dependable Movers ensured that everything reached its destination without a single bump or scratch. Really amazed by their services!",
  author: "Jenny J.",
};

export function ServiceRailBlock() {
  return (
    <BlockReveal>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
        <div>
          <SectionKicker>Our Services</SectionKicker>
          <h2 className="font-[family-name:var(--font-barlow-condensed)] text-3xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#0F172A] md:text-4xl">
            Stress-Free Moving Solutions
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Moving homes or relocating offices is a part of life. At Dependable
            Movers, we offer our customers a stress-free move at affordable
            prices with 50 years of combined experience.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, index) => (
              <Link
                key={service.slug}
                href={service.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs font-medium text-[#ED7D22]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-barlow-condensed)] text-xl font-bold uppercase tracking-tight text-[#0F172A]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav
            aria-label="Service links"
            className="rounded-3xl border border-slate-200 bg-white p-5"
          >
            <p className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold uppercase tracking-[0.14em] text-[#0F172A]">
              Browse Services
            </p>
            <ul className="mt-4 space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0F172A]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-relaxed text-slate-600">
              &ldquo;{RAIL_TESTIMONIAL.quote}&rdquo;
            </p>
            <p className="mt-3 font-[family-name:var(--font-barlow-condensed)] text-xs font-bold uppercase tracking-[0.14em] text-[#0F172A]">
              — {RAIL_TESTIMONIAL.author}
            </p>
          </div>
        </aside>
      </div>
    </BlockReveal>
  );
}
