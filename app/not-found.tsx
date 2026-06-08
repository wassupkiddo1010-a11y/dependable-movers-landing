import Link from "next/link";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/ui/footer-section";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { QuoteFormButton } from "@/components/ui/quote-form-button";
import { ROUTES } from "@/lib/routes";
import { SITE_PHONE, SITE_PHONE_HREF } from "@/lib/site-config";

const quickLinks = [
  { label: "Home", href: ROUTES.home },
  { label: "Our Services", href: ROUTES.services },
  { label: "About Us", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col bg-[#102141] font-sans text-white">
      <SiteNav />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(237,125,34,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[100%] bg-[#16335B]/40 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="font-[family-name:var(--font-poppins)] text-[clamp(5rem,18vw,9rem)] font-black leading-none tracking-tighter text-white/10">
            404
          </p>
          <h1 className="-mt-[0.35em] font-[family-name:var(--font-poppins)] text-3xl font-bold uppercase tracking-wide md:text-5xl">
            Wrong Turn
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-white/75 md:text-lg">
            This page didn&apos;t make the move with us. The route may have
            changed, or the link might be outdated.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonWithIcon href={ROUTES.home} variant="orange">
              Back to Home
            </ButtonWithIcon>
            <QuoteFormButton variant="default">Get A Quote</QuoteFormButton>
          </div>

          <p className="mt-8 text-sm text-white/60">
            Need help now? Call{" "}
            <a
              href={SITE_PHONE_HREF}
              className="font-semibold text-[#ED7D22] transition-colors hover:text-white"
            >
              {SITE_PHONE}
            </a>
          </p>

          <nav
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
            aria-label="Helpful links"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>

      <div className="bg-[#f9f9f9]">
        <Footer />
      </div>
    </div>
  );
}
