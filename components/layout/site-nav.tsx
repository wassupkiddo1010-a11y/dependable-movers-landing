"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { NAV_LINKS, ROUTES } from "@/lib/routes";
import { SITE_PHONE, SITE_PHONE_HREF } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === ROUTES.home) return pathname === "/" || pathname === "";
  return pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#16335B]/10 bg-[#16335B] text-white shadow-md">
      <div className="mx-auto max-w-[1400px] px-4 pb-3 sm:px-6 sm:pb-4">
        <div className="flex items-center justify-between gap-3 pt-3 sm:pt-4">
          <Link
            href={ROUTES.home}
            className="inline-flex shrink-0 items-center"
            aria-label="Dependable Movers home"
          >
            <img
              src="/assets/logo.png"
              alt="Dependable Movers"
              className="h-11 w-auto max-w-[140px] object-contain md:h-14 md:max-w-[11rem]"
              width={220}
              height={70}
              decoding="async"
            />
          </Link>

          <nav
            className="hidden items-center gap-2 md:flex"
            aria-label="Primary navigation"
          >
            <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-1 py-1 backdrop-blur-md">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive(pathname, link.href)
                      ? "bg-white/15 text-white"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={SITE_PHONE_HREF}
                className="hidden items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:text-white lg:inline-flex"
              >
                <Phone className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                {SITE_PHONE}
              </a>
              <ButtonWithIcon href={ROUTES.quote} className="shrink-0">
                Request A Quote
              </ButtonWithIcon>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-white/90" />
            ) : (
              <Menu className="h-5 w-5 text-white/90" />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <nav
            className="mt-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-0.5 font-sans">
              <a
                href={SITE_PHONE_HREF}
                className="py-2.5 text-sm font-semibold text-white/95"
              >
                {SITE_PHONE}
              </a>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-2 text-sm font-medium transition-colors",
                    isActive(pathname, link.href)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <ButtonWithIcon
                href={ROUTES.quote}
                className="mt-2 w-full justify-center"
              >
                Request A Quote
              </ButtonWithIcon>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
