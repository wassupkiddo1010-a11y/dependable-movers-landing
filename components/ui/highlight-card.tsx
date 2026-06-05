"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface HighlightCardProps {
  title: string;
  description: string[];
  icon?: ReactNode;
  className?: string;
}

export const HighlightCard: FC<HighlightCardProps> = ({
  title,
  description,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "group flex h-full min-h-[420px] w-full max-w-[350px] cursor-pointer flex-col transform transition-all duration-500 hover:scale-105 hover:-rotate-1",
        className
      )}
    >
      <Card className="relative flex h-full min-h-[420px] w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#16335B] via-[#1e4a7a] to-[#102141] text-white shadow-2xl shadow-[#16335B]/30 backdrop-blur-xl hover:border-[#ED7D22]/40 hover:shadow-2xl hover:shadow-[#ED7D22]/10">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-[#ED7D22]/10 opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 transform rounded-full bg-gradient-to-tr from-[#ED7D22]/20 to-transparent opacity-30 blur-3xl transition-all duration-700 group-hover:scale-110 group-hover:opacity-50" />
          <div className="absolute left-10 top-10 h-16 w-16 animate-ping rounded-full bg-[#ED7D22]/10 blur-xl" />
          <div className="absolute bottom-16 right-16 h-12 w-12 animate-ping rounded-full bg-white/10 blur-lg" />
          <div className="absolute inset-0 -skew-x-12 translate-x-full transform bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[-200%]" />
        </div>

        <div className="relative z-10 flex h-full min-h-0 flex-1 flex-col items-center p-8 text-center">
          <div className="relative mx-auto mb-6 flex h-[100px] w-[100px] min-h-[100px] shrink-0 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-[#ED7D22]/30" />
            <div className="absolute inset-0 animate-pulse rounded-full border border-white/15" />

            <div className="flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#16335B]/90 to-[#102141]/90 p-2 shadow-2xl backdrop-blur-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 hover:shadow-[#ED7D22]/25">
              <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center [&_img]:mx-auto [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:max-h-[4.5rem] [&_img]:max-w-[4.5rem] [&_img]:object-contain [&_img]:object-center">
                <div className="transition-transform duration-700 group-hover:rotate-180">
                  {icon}
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center">
            <h3 className="mb-4 font-[family-name:var(--font-barlow,'Barlow_Condensed')] text-4xl font-bold uppercase tracking-wide text-white transition-transform duration-300 group-hover:scale-105">
              {title}
            </h3>

            <div className="max-w-sm space-y-1.5">
              {description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-[1.0625rem] leading-relaxed text-white/95 transition-colors duration-300 group-hover:text-white"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-auto flex w-full shrink-0 flex-col items-center pt-5">
            <div
              className="h-[2px] max-h-[2px] min-h-[2px] w-1/3 shrink-0 rounded-none bg-gradient-to-r from-transparent via-[#ED7D22] to-transparent transition-[width] duration-500 group-hover:w-1/2"
              aria-hidden
            />
          </div>
        </div>

        <div className="absolute left-0 top-0 h-20 w-20 rounded-br-3xl bg-gradient-to-br from-[#ED7D22]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-3xl bg-gradient-to-tl from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Card>
    </div>
  );
};

export default HighlightCard;
