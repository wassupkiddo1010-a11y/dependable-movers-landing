"use client";

import HighlightCard from "@/components/ui/highlight-card";
import Image from "next/image";

const TRUST_CARDS = [
  {
    title: "Trusted",
    imageSrc: "/assets/trust-trusted.png",
    imageAlt: "Trusted",
    description: [
      "We bring years of combined experience to every move,",
      "ensuring your belongings are handled with absolute care,",
      "and delivered safely to your destination.",
    ],
  },
  {
    title: "Secure",
    imageSrc: "/assets/trust-secure.png",
    imageAlt: "Secure",
    description: [
      "We coordinate only with vetted, professional moving crews",
      "so your cargo is always in experienced, accountable hands.",
    ],
  },
  {
    title: "Affordable",
    imageSrc: "/assets/trust-affordable.png",
    imageAlt: "Affordable",
    description: [
      "Moving is stressful enough.",
      "We provide competitive rates for families and businesses nationwide",
      "no hidden fees, no surprises.",
    ],
  },
] as const;

export default function TrustCardsDemo() {
  return (
    <section
      id="credibility"
      aria-labelledby="trust-section-heading"
      className="bg-[#F0F2F7] px-6 py-16"
    >
      <div className="mx-auto max-w-[1100px]">
        <h2
          id="trust-section-heading"
          className="mb-12 text-center font-sans text-4xl font-extrabold tracking-tight text-[#1A1A1A] md:text-5xl"
        >
          Our Credibility
        </h2>
        <div className="flex flex-row flex-wrap items-stretch justify-center gap-6">
        {TRUST_CARDS.map((card) => (
          <div key={card.title} className="flex min-h-[420px] flex-1 basis-[280px] max-w-[350px]">
            <HighlightCard
              className="h-full w-full max-w-none"
              title={card.title}
              description={[...card.description]}
              icon={
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={72}
                  height={72}
                  className="h-[4.5rem] w-[4.5rem] object-contain object-center"
                />
              }
            />
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
