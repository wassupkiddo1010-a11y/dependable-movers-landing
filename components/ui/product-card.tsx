"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProductHighlightCardProps {
  className?: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const ProductHighlightCard = React.forwardRef<
  HTMLDivElement,
  ProductHighlightCardProps
>(
  (
    { className, title, description, imageSrc, imageAlt },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({
      clientX,
      clientY,
      currentTarget,
    }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 350], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 350], [-10, 10]);

    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 350], [0, 100]);
    const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative mx-auto h-[350px] w-full max-w-[350px] rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl",
          className
        )}
      >
        <div
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className="absolute inset-4 rounded-xl bg-[#16335B]/[0.04] shadow-inner"
        >
          <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl"
            style={{
              opacity: glowOpacity,
              background: `radial-gradient(80px at ${glowX}% ${glowY}%, #16335B, transparent 40%)`,
            }}
          />

          <div className="relative z-10 flex h-full flex-col items-center p-6 text-center text-[#1A1A1A]">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              style={{ transform: "translateZ(40px)" }}
              whileHover={{ scale: 1.08, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mb-6 h-28 w-28 object-contain"
            />

            <div style={{ transform: "translateZ(30px)" }}>
              <h2 className="font-[family-name:var(--font-barlow,'Barlow_Condensed')] text-3xl font-bold uppercase tracking-wide text-[#16335B]">
                {title}
              </h2>
              <p className="mx-auto mt-3 max-w-[85%] text-sm leading-relaxed text-[#555555]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";

export default ProductHighlightCard;
