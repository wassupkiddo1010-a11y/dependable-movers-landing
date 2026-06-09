import type { ReactNode } from "react";

type InnerPageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  kicker?: string;
};

function PageKicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 flex items-center justify-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.22em] text-[#ED7D22] md:justify-start">
      <span aria-hidden className="text-base leading-none">
        ✱
      </span>
      {children}
    </p>
  );
}

export function InnerPageShell({
  title,
  description,
  children,
  kicker = "Dependable Movers",
}: InnerPageShellProps) {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl text-center md:text-left">
          <PageKicker>{kicker}</PageKicker>
          <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:mx-0 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>
    </>
  );
}
