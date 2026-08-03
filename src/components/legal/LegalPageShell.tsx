import type { ReactNode } from "react";

export function LegalPageShell({
  title,
  intro,
  meta,
  children,
}: {
  title: string;
  intro: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mb-6 border-b border-border pb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            SAS × WiMa
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-anthracite-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
            {intro}
          </p>
          {meta ? (
            <p className="mt-2 text-xs font-medium text-anthracite-400">{meta}</p>
          ) : null}
        </header>
        <div className="space-y-6 text-sm leading-relaxed text-anthracite-700">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-semibold tracking-tight text-anthracite-900">
        {title}
      </h2>
      <div className="mt-2 space-y-2 text-anthracite-600">{children}</div>
    </section>
  );
}
