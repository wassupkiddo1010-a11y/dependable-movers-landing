"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BlockReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center justify-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#ED7D22] md:justify-start">
      <span aria-hidden className="text-base leading-none">
        ✱
      </span>
      {children}
    </p>
  );
}

export const innerFieldClass =
  "h-[52px] w-full rounded-2xl border border-slate-200 bg-white px-4 text-[15px] text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-[#ED7D22] focus:ring-2 focus:ring-[#ED7D22]/25";

export const innerSelectClass = cn(
  innerFieldClass,
  "appearance-none bg-[length:16px] bg-[position:right_14px_center] bg-no-repeat pr-11"
);

export const innerTextareaClass =
  "min-h-[140px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-[#ED7D22] focus:ring-2 focus:ring-[#ED7D22]/25";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-[#ED7D22]">{message}</p>;
}
