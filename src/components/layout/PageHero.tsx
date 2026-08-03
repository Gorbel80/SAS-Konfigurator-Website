import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Compact page intro — less scroll than full-width image heroes */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-b border-border bg-surface",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-2xl font-semibold tracking-tight text-anthracite-900 text-balance sm:text-3xl md:text-[2rem] md:leading-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-anthracite-500 sm:text-base">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
