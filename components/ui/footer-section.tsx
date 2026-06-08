"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import {
  BROKER_DISCLAIMER,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site-config";
import { SERVICES } from "@/data/services";

interface FooterLink {
  title: ReactNode;
  href?: string;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Quick Links",
    links: [
      { title: "Home", href: ROUTES.home },
      { title: "About Us", href: ROUTES.about },
      { title: "Our Services", href: ROUTES.services },
      { title: "Contact Us", href: ROUTES.contact },
      { title: "Preferred Carriers", href: ROUTES.preferredCarriers },
    ],
  },
  {
    label: "Services",
    links: SERVICES.map((service) => ({
      title: service.title,
      href: service.href,
    })),
  },
  {
    label: "Support",
    links: [
      { title: "Privacy Policy", href: ROUTES.privacyPolicy },
      { title: "Terms & Conditions", href: ROUTES.termsAndConditions },
    ],
  },
  {
    label: "Get in Touch",
    links: [
      { title: "800-823-0395", href: "tel:+18008230395" },
      {
        title: SITE_EMAIL,
        href: SITE_EMAIL_HREF,
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

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-4xl border-t border-gray-200 bg-[#f9f9f9] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(22,51,91,0.06),transparent)] px-6 py-12 md:rounded-t-[2.5rem] lg:py-16"
    >
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#16335B]/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <Link href={ROUTES.home} aria-label={`${SITE_NAME} home`} className="inline-block">
            <Image
              src="/assets/logo.png"
              alt={SITE_NAME}
              width={220}
              height={70}
              className="h-14 w-auto max-w-[11rem] object-contain"
            />
          </Link>
          <p className="font-heading text-sm font-semibold text-[#ED7D22]">
            {SITE_TAGLINE}
          </p>
          <p className="text-muted-foreground mt-2 text-sm md:mt-0">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
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
                        link.href.startsWith("/") ? (
                          <Link
                            href={link.href}
                            className="inline-flex items-center transition-all duration-300 hover:text-[#2E6DB4]"
                          >
                            {link.title}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="inline-flex items-center transition-all duration-300 hover:text-[#2E6DB4]"
                          >
                            {link.title}
                          </a>
                        )
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

      <AnimatedContainer
        delay={0.5}
        className="mt-12 w-full border-t border-gray-200 pt-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-end">
          <SubscribeForm />
        </div>

        <p className="mt-10 mb-4 text-xs leading-relaxed text-gray-500">
          {BROKER_DISCLAIMER}
        </p>
      </AnimatedContainer>
    </footer>
  );
}

function SubscribeForm() {
  const [submitted, setSubmitted] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem(
      "subscribe-email"
    ) as HTMLInputElement;
    if (
      !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      return;
    }

    try {
      const response = await fetch("/api/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value.trim() }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        window.alert(data.error ?? "Subscription failed. Please try again.");
      }
    } catch {
      window.alert("Subscription failed. Please try again.");
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
