"use client";

import HighlightCard from "@/components/ui/highlight-card";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

type CardAnimState = "hidden" | "visible" | "exit";

function useTrustCardsScrollAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  const [animState, setAnimState] = useState<CardAnimState>("visible");
  const scrollDirection = useRef<"up" | "down">("down");
  const wasVisible = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const grid = section.querySelector(".trust-cards-grid");
    if (!grid) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimState("visible");
      return;
    }

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY !== lastScrollY) {
        scrollDirection.current = currentY > lastScrollY ? "down" : "up";
      }
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
          const rect = entry.boundingClientRect;

          if (isVisible && !wasVisible.current) {
            setAnimState("visible");
            wasVisible.current = true;
            return;
          }

          if (!isVisible && wasVisible.current) {
            if (
              scrollDirection.current === "up" &&
              rect.top >= window.innerHeight
            ) {
              setAnimState("exit");
            } else if (
              scrollDirection.current === "down" &&
              rect.bottom <= 0
            ) {
              setAnimState("hidden");
            }
            wasVisible.current = false;
          }
        });
      },
      { threshold: [0, 0.2, 0.35], rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(grid);

    const rect = grid.getBoundingClientRect();
    if (
      rect.top < window.innerHeight * 0.85 &&
      rect.bottom > window.innerHeight * 0.12
    ) {
      setAnimState("visible");
      wasVisible.current = true;
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [sectionRef]);

  return animState;
}

export default function TrustCardsDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const animState = useTrustCardsScrollAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="credibility"
      aria-labelledby="trust-section-heading"
      className="overflow-x-clip bg-gradient-to-br from-[#16335B] via-[#1a3d6b] to-[#102141] px-6 py-16"
    >
      <div className="mx-auto max-w-[1100px]">
        <h2
          id="trust-section-heading"
          className="font-plus-jakarta mb-12 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl"
        >
          Our Credibility
        </h2>
        <div className="trust-cards-grid flex flex-row flex-wrap items-stretch justify-center gap-6">
          {TRUST_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              className="flex min-h-[420px] max-w-[350px] flex-1 basis-[280px]"
              initial={false}
              animate={
                animState === "visible"
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: 64 }
              }
              transition={{
                duration: animState === "exit" ? 0.45 : 0.55,
                delay: index * (animState === "exit" ? 0.1 : 0.14),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
