"use client";

import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface ResponsiveHeroNavProps {
  logoUrl?: string;
  logoAlt?: string;
  navLinks?: NavLink[];
  phoneNumber?: string;
  phoneHref?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  className?: string;
}

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "#", isActive: true },
  { label: "Local Moving", href: "#consultation" },
  { label: "Long Distance Moving", href: "#consultation" },
  { label: "Commercial Moving", href: "#consultation" },
  { label: "Furniture Moving", href: "#consultation" },
];

export function ResponsiveHeroNav({
  logoUrl = "/assets/logo.png",
  logoAlt = "Dependable Movers",
  navLinks = defaultNavLinks,
  phoneNumber = "800-823-0395",
  phoneHref = "tel:+18008230395",
  ctaButtonText = "Request A Quote",
  ctaButtonHref = "#consultation",
  className = "",
}: ResponsiveHeroNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full isolate ${className}`}
    >
      <div className="mx-4 sm:mx-6">
        <div className="flex items-center justify-between gap-3 pt-4">
          <a href="#" className="inline-flex shrink-0 items-center" aria-label={`${logoAlt} home`}>
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-10 w-auto max-w-[100px] object-contain md:h-11 md:max-w-[140px]"
              width={140}
              height={44}
              decoding="async"
            />
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`whitespace-nowrap px-3 py-2 font-sans text-sm font-medium transition-colors ${
                    link.isActive
                      ? "text-white/90"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={phoneHref}
                className="hidden items-center gap-1.5 whitespace-nowrap px-3 py-2 font-sans text-sm font-semibold text-white/90 transition-colors hover:text-white lg:inline-flex"
              >
                {phoneNumber}
              </a>
              <a
                href={ctaButtonHref}
                className="ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 font-sans text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
              >
                {ctaButtonText}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
              </a>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur-md md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-white/90" aria-hidden />
            ) : (
              <Menu className="h-5 w-5 text-white/90" aria-hidden />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            className="mt-3 overflow-hidden rounded-2xl bg-white/10 font-sans ring-1 ring-white/15 backdrop-blur-md md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-0.5 px-4 py-3">
              <a
                href={phoneHref}
                className="py-2.5 text-sm font-semibold text-white/95"
              >
                {phoneNumber}
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`py-2 text-sm font-medium transition-colors ${
                    link.isActive ? "text-white/90" : "text-white/80 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaButtonHref}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-white/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                {ctaButtonText}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default ResponsiveHeroNav;
