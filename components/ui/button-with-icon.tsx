import type { MouseEventHandler, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface ButtonWithIconProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "default" | "orange";
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export function ButtonWithIcon({
  children,
  href,
  className,
  variant = "default",
  onClick,
}: ButtonWithIconProps) {
  const isOrange = variant === "orange";
  const classes = cn(
    "group relative h-10 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-5 pe-12 text-sm font-medium transition-all duration-500 hover:ps-12 hover:pe-5",
    isOrange
      ? "bg-[#ED7D22] text-white hover:bg-[#D4691A]"
      : "bg-white text-neutral-900 hover:bg-white/90",
    className
  );

  const content = (
    <>
      <span className="relative z-10 whitespace-nowrap transition-all duration-500">
        {children}
      </span>
      <span
        className={cn(
          "absolute right-1 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45",
          isOrange
            ? "bg-white/20 text-white"
            : "bg-neutral-100 text-neutral-900"
        )}
        aria-hidden
      >
        <ArrowUpRight size={16} />
      </span>
    </>
  );

  if (href) {
    return (
      <Button asChild className={classes}>
        <a href={href} onClick={onClick}>
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button type="button" className={classes} onClick={onClick}>
      {content}
    </Button>
  );
}

export default ButtonWithIcon;
