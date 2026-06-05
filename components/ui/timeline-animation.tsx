"use client";

import {
  motion,
  useInView,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type RefObject,
} from "react";

export type TimelineInViewOptions = {
  amount?: number;
  margin?: string;
  once?: boolean;
};

export function useTimelineInView(
  ref: RefObject<HTMLElement | null>,
  options: TimelineInViewOptions = {}
) {
  return useInView(ref, {
    once: options.once ?? true,
    amount: options.amount ?? 0.2,
    margin: options.margin ?? "0px 0px -80px 0px",
  });
}

type TimelineContentProps<T extends ElementType> = {
  as?: T;
  animationNum?: number;
  timelineRef: RefObject<HTMLElement | null>;
  isInView?: boolean;
  customVariants?: Variants;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "children">;

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

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum = 0,
  timelineRef,
  isInView: isInViewProp,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps<T>) {
  const Tag = (as ?? "div") as keyof typeof motionMap;
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
      {...(props as HTMLMotionProps<"div">)}
    >
      {children}
    </MotionComponent>
  );
}

export { TimelineContent as TimelineAnimation };
