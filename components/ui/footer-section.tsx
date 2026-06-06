"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Facebook, Youtube } from "lucide-react";
import Image from "next/image";

interface FooterLink {
  title: ReactNode;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Quick Links",
    links: [
      { title: "Home", href: "#" },
      { title: "About Us", href: "#about" },
      { title: "Our Services", href: "#services" },
      { title: "Contact Us", href: "#contact" },
      { title: "Make a Payment", href: "#" },
      { title: "Preferred Carriers", href: "#" },
    ],
  },
  {
    label: "Services",
    links: [
      { title: "Local Moving", href: "#services" },
      { title: "Long Distance Moving", href: "#services" },
      { title: "Commercial Moving", href: "#services" },
      { title: "Furniture Moving", href: "#services" },
      { title: "Piano Moving", href: "#services" },
      { title: "Last-Second Moves", href: "#services" },
    ],
  },
  {
    label: "Support",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms & Conditions", href: "#" },
    ],
  },
  {
    label: "Get in Touch",
    links: [
      {
        title: "800-823-0395",
        href: "tel:+18008230395",
      },
      {
        title: "support@dependablemovers.com",
        href: "mailto:support@dependablemovers.com",
      },
      {
        title: (
          <>
            7202 S US Highway 1
            <br />
            Port Saint Lucie, FL 34952
          </>
        ),
      },
      { title: "DOT: 4014864 · MC: 01512730" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: TwitterIcon },
  { label: "YouTube", href: "#", icon: Youtube },
] as const;

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-4xl border-t border-gray-200 bg-[#f9f9f9] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(22,51,91,0.06),transparent)] px-6 py-12 md:rounded-t-[2.5rem] lg:py-16"
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#16335B]/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <a href="#" aria-label="Dependable Movers home" className="inline-block">
            <Image
              src="/assets/logo.png"
              alt="Dependable Movers"
              width={220}
              height={70}
              className="h-14 w-auto max-w-[11rem] object-contain"
            />
          </a>
          <p className="font-heading text-sm font-semibold text-[#ED7D22]">
            Top-notch moving services for businesses and individuals across the
            U.S.
          </p>
          <p className="text-muted-foreground mt-2 text-sm md:mt-0">
            © {new Date().getFullYear()} Dependable Movers. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="font-heading text-xs font-bold uppercase tracking-wide text-[#1A1A1A]">
                  {section.label}
                </h3>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li key={`${section.label}-${linkIndex}`}>
                      {link.href ? (
                        <a
                          href={link.href}
                          className="inline-flex items-center transition-all duration-300 hover:text-[#2E6DB4]"
                        >
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </a>
                      ) : (
                        <span className="inline-flex items-center leading-relaxed">
                          {link.title}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <AnimatedContainer delay={0.5} className="mt-12 w-full border-t border-gray-200 pt-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-[#16335B] transition-colors hover:border-[#16335B] hover:bg-[#16335B] hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>

          <SubscribeForm />
        </div>

        <p className="mt-10 mb-4 text-xs leading-relaxed text-gray-500">
          Please note that a properly licensed interstate broker, such as
          Dependable Movers, is not a motor carrier and will not transport an
          individual shipper&apos;s household goods, but will coordinate and
          arrange for the transportation of household goods by an FMCSA authorized
          motor carrier, whose charges will be determined by its published tariff.
          All estimated charges and final actual charges will be based upon the
          carrier&apos;s tariff which is available for inspection from the carrier
          upon reasonable request. (1) 70% OFF on Tariff Rates.
        </p>
      </AnimatedContainer>
    </footer>
  );
}

function SubscribeForm() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem("subscribe-email") as HTMLInputElement;
    if (
      email.value.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="text-sm text-[#2E6DB4]">Thank you for subscribing.</p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto"
      noValidate
    >
      <label htmlFor="subscribe-email" className="sr-only">
        Email for newsletter
      </label>
      <input
        type="email"
        id="subscribe-email"
        name="subscribe-email"
        required
        placeholder="Your email address"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ED7D22] lg:w-64"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-lg bg-[#16335B] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e4578] active:scale-[0.98]"
      >
        Subscribe
      </button>
    </form>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
