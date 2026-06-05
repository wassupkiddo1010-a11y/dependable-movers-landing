"use client";

import {
  TimelineContent,
  useTimelineInView,
} from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { useRef } from "react";

export default function AboutSection3() {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useTimelineInView(heroRef);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.22,
        duration: 0.45,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.22,
        duration: 0.45,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#f9f9f9] px-4 py-16 font-sans md:py-24"
      ref={heroRef}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-12 lg:mb-16">
          <div className="absolute -top-3 z-10 mb-8 flex w-[85%] items-center sm:-top-2 md:top-0 lg:top-4">
            <div className="flex items-center gap-2 text-xl">
              <span className="animate-spin text-[#ED7D22]">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="text-sm font-semibold uppercase tracking-wider text-[#16335B]"
              >
                WHO WE ARE
              </TimelineContent>
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={1}
            timelineRef={heroRef}
            isInView={isInView}
            customVariants={scaleVariants}
            className="group relative aspect-[100/40] w-full"
          >
            <svg className="h-auto w-full" viewBox="0 0 100 40">
              <defs>
                <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                  <path d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z" />
                </clipPath>
              </defs>
              <g clipPath="url(#clip-inverted)">
                <image
                  preserveAspectRatio="xMidYMid slice"
                  width="100%"
                  height="100%"
                  href="/assets/about-hero.png"
                />
              </g>
            </svg>
          </TimelineContent>

          <div className="flex flex-wrap items-center justify-between py-6 text-sm md:py-8 lg:justify-start">
            <TimelineContent
              as="div"
              animationNum={2}
              timelineRef={heroRef}
              isInView={isInView}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-[#ED7D22]">20+</span>
                <span className="text-gray-600">years of experience</span>
                <span className="text-gray-300">|</span>
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-base">
                <span className="font-bold text-[#ED7D22]">50,000+</span>
                <span className="text-gray-600">moves completed</span>
              </div>
            </TimelineContent>
            <div className="bottom-16 right-0 flex flex-row-reverse gap-4 lg:absolute lg:flex-col lg:gap-0">
              <TimelineContent
                as="div"
                animationNum={3}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-2xl sm:text-3xl lg:text-4xl"
              >
                <span className="font-semibold text-[#ED7D22]">48</span>
                <span className="uppercase text-gray-600">states</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="mb-2 flex items-center gap-2 text-xs sm:text-base"
              >
                <span className="font-bold text-[#ED7D22]">98%</span>
                <span className="text-gray-600">on-time delivery</span>
                <span className="block text-gray-300 lg:hidden">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-10 md:grid-cols-3 md:gap-12 lg:mt-6">
          <div className="md:col-span-2">
            <h1 className="mb-10 text-2xl font-extrabold !leading-[110%] tracking-tight text-[#1A1A1A] sm:mb-12 sm:text-4xl md:text-5xl">
              <VerticalCutReveal
                autoStart={false}
                viewportRef={heroRef}
                isInView={isInView}
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 1.5,
                }}
              >
                Moving You Forward, Every Mile.
              </VerticalCutReveal>
            </h1>

            <div className="grid gap-10 text-gray-600 md:grid-cols-2 md:gap-12">
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  United Global Van Line began with a simple promise: to make
                  every move stress-free, reliable, and handled with care. Today
                  we move families and businesses across the country with that
                  same commitment.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="text-xs sm:text-base"
              >
                <p className="text-justify leading-relaxed">
                  Every move tells a story, and we take pride in handling yours
                  with professionalism and precision. From packing to delivery,
                  our experienced team ensures your belongings arrive safely and
                  on time.
                </p>
              </TimelineContent>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="text-right md:text-right">
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="mb-2 text-2xl font-extrabold text-[#16335B]"
              >
                United Global Van Line
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={8}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="mb-8 text-sm text-gray-600"
              >
                Licensed & Insured | Nationwide Movers
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="mb-6"
              >
                <p className="mb-4 font-medium text-gray-900">
                  Ready to make your next move simple and stress-free?
                </p>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                isInView={isInView}
                customVariants={revealVariants}
                className="flex justify-end md:justify-end"
              >
                <ButtonWithIcon href="#consultation" variant="orange">
                  Get A Free Quote
                </ButtonWithIcon>
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
