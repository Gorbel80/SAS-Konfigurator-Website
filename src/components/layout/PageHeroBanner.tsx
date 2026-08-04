import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  imageSrc: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Optional CTAs / extra actions under the text */
  children?: ReactNode;
  /** Slightly shorter banner on inner pages */
  compact?: boolean;
  /** Descriptive alt for SEO; decorative heroes can keep a short label */
  imageAlt?: string;
};

/**
 * Shared dark industrial hero for Start, Über uns and Kontakt.
 */
export function PageHeroBanner({
  imageSrc,
  eyebrow,
  title,
  subtitle,
  children,
  compact = false,
  imageAlt,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          priority
          className="object-cover scale-[1.01]"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/92 to-anthracite-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/40 via-transparent to-anthracite-950/20" />
      </div>

      <div
        className={
          compact
            ? "relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
            : "relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
        }
      >
        <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(217,119,6,0.25)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        </div>

        <h1 className="animate-fade-up animate-delay-1 mt-4 max-w-3xl text-[1.75rem] font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
          {title}
        </h1>

        <p className="animate-fade-up animate-delay-2 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-anthracite-200/95 sm:text-base">
          {subtitle}
        </p>

        {children ? (
          <div className="animate-fade-up animate-delay-3 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
