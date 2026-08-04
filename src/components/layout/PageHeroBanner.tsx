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
  /** Extra-tight hero (e.g. product subpages) */
  dense?: boolean;
  /** Descriptive alt for SEO; decorative heroes can keep a short label */
  imageAlt?: string;
  /** Optional small badge (e.g. product line) */
  badge?: string;
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
  dense = false,
  imageAlt,
  badge,
}: Props) {
  const pad =
    dense
      ? "relative mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
      : compact
        ? "relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10"
        : "relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12";

  const titleClass = dense
    ? "animate-fade-up animate-delay-1 mt-2 max-w-3xl text-[1.35rem] font-semibold tracking-tight text-white text-balance sm:text-xl lg:text-[1.75rem] lg:leading-[1.15]"
    : compact
      ? "animate-fade-up animate-delay-1 mt-3 max-w-3xl text-[1.5rem] font-semibold tracking-tight text-white text-balance sm:text-[1.85rem] lg:text-[2rem] lg:leading-[1.15]"
      : "animate-fade-up animate-delay-1 mt-3.5 max-w-3xl text-[1.65rem] font-semibold tracking-tight text-white text-balance sm:text-3xl lg:text-[2.25rem] lg:leading-[1.12]";

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fill
          priority
          className="object-cover object-center scale-[1.01]"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/92 to-anthracite-800/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/75 via-transparent to-anthracite-950/30" />
        {/* subtle industrial grid */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
      </div>

      <div className={pad}>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(11,107,203,0.3)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky">
              {eyebrow}
            </p>
          </div>
          {badge ? (
            <span className="animate-fade-up animate-delay-1 rounded-md border border-sky/40 bg-sky/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky">
              {badge}
            </span>
          ) : null}
        </div>

        <h1 className={titleClass}>{title}</h1>

        <p
          className={
            dense
              ? "animate-fade-up animate-delay-2 mt-1.5 max-w-xl text-sm leading-snug text-anthracite-200/95"
              : "animate-fade-up animate-delay-2 mt-2.5 max-w-xl text-sm leading-relaxed text-anthracite-200/95 sm:text-[0.9375rem]"
          }
        >
          {subtitle}
        </p>

        {children ? (
          <div
            className={
              dense
                ? "animate-fade-up animate-delay-3 mt-3.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
                : "animate-fade-up animate-delay-3 mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center"
            }
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
