import type { ReactNode } from "react";

/**
 * Typography-only extract from experience-hero (heading + subcopy).
 * Use inside the Dependable Movers hero — no WebGL / Three.js required.
 */
export interface ExperienceHeroTypographyProps {
  titleLine1?: string;
  titleLine2?: string;
  description?: ReactNode;
  className?: string;
}

export function ExperienceHeroTypography({
  titleLine1 = "Dependable",
  titleLine2 = "Movers",
  description = "Your trusted moving partner for local, long-distance, and commercial relocations.",
  className = "",
}: ExperienceHeroTypographyProps) {
  return (
    <div className={className}>
      <h1 className="font-[family-name:var(--font-barlow)] text-[clamp(3.5rem,9.5vw,8.5rem)] font-black uppercase leading-[0.87] tracking-tighter text-white">
        {titleLine1}
        <br />
        <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.92)]">
          {titleLine2}
        </span>
      </h1>
      <p className="mt-8 max-w-xs font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.35em] text-white opacity-90">
        {description}
      </p>
    </div>
  );
}

export default ExperienceHeroTypography;
