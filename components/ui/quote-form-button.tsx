"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { ROUTES } from "@/lib/routes";
import {
  markQuoteScrollIntent,
  scrollToQuoteSection,
} from "@/lib/quote-scroll";

type QuoteFormButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "orange";
};

export function QuoteFormButton({
  children,
  className,
  variant = "orange",
}: QuoteFormButtonProps) {
  const pathname = usePathname();
  const isHome =
    pathname === "/" ||
    pathname === "" ||
    pathname === "/index.html";

  return (
    <ButtonWithIcon
      href={ROUTES.home}
      variant={variant}
      className={className}
      onClick={(event) => {
        if (isHome) {
          event.preventDefault();
          scrollToQuoteSection();
          return;
        }
        markQuoteScrollIntent();
      }}
    >
      {children}
    </ButtonWithIcon>
  );
}
