import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  narrow?: boolean;
};

export function Section({
  className,
  children,
  narrow = false,
  ...props
}: Props) {
  return (
    <section className={cn("py-6 md:py-8", className)} {...props}>
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          narrow ? "max-w-3xl" : "max-w-7xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-4 md:mb-5 max-w-3xl">
      {eyebrow ? (
        <p
          className={cn(
            "mb-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
            "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-xl md:text-2xl font-semibold tracking-tight text-balance",
          light ? "text-white" : "text-anthracite-900",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed",
            light ? "text-anthracite-300" : "text-anthracite-500",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
