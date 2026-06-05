"use client";

import React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const STAGGER = 0.035;

function rollChar(char: string) {
  return char === " " ? "\u00A0" : char;
}

function rollCharClass(char: string) {
  return char === " " ? "inline-block text-roll__char--space" : "inline-block";
}

export interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
}

export default function TextRoll({
  children,
  className,
  center = false,
}: TextRollProps) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative block overflow-hidden text-black dark:text-white/90",
        className
      )}
      style={{
        lineHeight: 0.85,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className={rollCharClass(l)}
              key={i}
            >
              {rollChar(l)}
            </motion.span>
          );
        })}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className={rollCharClass(l)}
              key={i}
            >
              {rollChar(l)}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
}

export { TextRoll };
