"use client";

import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  type RefObject,
} from "react";

type ViewportMargin =
  | `${number}px`
  | `${number}px ${number}px`
  | `${number}px ${number}px ${number}px`
  | `${number}px ${number}px ${number}px ${number}px`;

export type TimelineInViewOptions = {
  amount?: number;
  margin?: ViewportMargin;
  once?: boolean;
};

const DEFAULT_TIMELINE_MARGIN = "0px 0px -80px 0px" as const;

export function useTimelineInView(
  ref: RefObject<HTMLElement | null>,
  options: TimelineInViewOptions = {}
) {
  return useInView(ref, {
    once: options.once ?? true,
    amount: options.amount ?? 0.2,
    margin: options.margin ?? DEFAULT_TIMELINE_MARGIN,
  });
}

type TimelineContentProps = {
  as?: keyof typeof motionMap;
  animationNum?: number;
  timelineRef: RefObject<HTMLElement | null>;
  isInView?: boolean;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
};

const motionMap = {
  div: motion.div,
  span: motion.span,
  a: motion.a,
  figure: motion.figure,
  button: motion.button,
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
} as const;

export function TimelineContent({
  as,
  animationNum = 0,
  timelineRef,
  isInView: isInViewProp,
  customVariants,
  className,
  children,
}: TimelineContentProps) {
  const Tag = as ?? "div";
  const MotionComponent = motionMap[Tag] ?? motion.div;

  const isInViewFallback = useTimelineInView(timelineRef);
  const isInView = isInViewProp ?? isInViewFallback;

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.15, duration: 0.4 },
    }),
  };

  const variants = customVariants ?? defaultVariants;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export { TimelineContent as TimelineAnimation };
