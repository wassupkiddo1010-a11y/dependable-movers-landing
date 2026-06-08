import type { ReactNode } from "react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import { ROUTES } from "@/lib/routes";

type InnerPageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function InnerPageShell({
  title,
  description,
  children,
}: InnerPageShellProps) {
  return (
    <>
      <section className="border-b border-[#16335B]/10 bg-[#f9f9f9] px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-[family-name:var(--font-poppins)] text-3xl font-bold tracking-tight text-[#1A1A1A] md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-[#555555] md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-[#555555] [&_a]:text-[#2E6DB4] [&_a]:transition-colors hover:[&_a]:text-[#16335B] [&_h2]:font-[family-name:var(--font-poppins)] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1A1A1A] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-[#16335B] px-4 py-12 text-center text-white md:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl font-bold md:text-3xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-sm text-white/80 md:text-base">
            Request a free quote and our coordinators will build a plan tailored
            to your move.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonWithIcon href={ROUTES.quote} variant="orange">
              Get A Quote
            </ButtonWithIcon>
          </div>
        </div>
      </section>
    </>
  );
}
