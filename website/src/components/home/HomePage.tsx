import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

/** Three pillars only – matches clean Gorbel start layout */
const pillars = [
  {
    id: "g-force",
    key: "lifts" as const,
    image: "lifts" as const,
    href: "/g-force",
  },
  {
    id: "service",
    key: "service" as const,
    image: "service" as const,
    href: "/service",
  },
  {
    id: "ersatzteile",
    key: "parts" as const,
    image: "parts" as const,
    href: "/contact",
  },
];

/**
 * Start page: compact hero + three cards. No extra sections.
 */
export function HomePage({ content, images }: Props) {
  const o = content.offerings;
  const h = content.home;

  return (
    <div className="flex-1 bg-[#f4f7fb]">
      {/* Compact full-width industrial hero */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-[21/7] min-h-[11.5rem] w-full sm:aspect-[24/7] sm:min-h-[13rem] lg:aspect-[28/7] lg:min-h-[14.5rem]">
          <Image
            src={images.hero}
            alt={h.heroTitle}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
          {/* Soft centered vignette – keeps product visible at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-anthracite-950/55 via-anthracite-950/45 to-anthracite-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(6_16_28_/_0.35)_100%)]" />

          <div className="absolute inset-0 flex items-center justify-center px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="animate-fade-up text-[1.35rem] font-semibold tracking-[-0.02em] text-white text-balance drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:text-[1.75rem] sm:leading-[1.2] lg:text-[2.05rem] lg:leading-[1.18]">
                {h.heroTitle}
              </h1>
              <p className="animate-fade-up animate-delay-1 mx-auto mt-2.5 max-w-xl text-[0.9375rem] font-medium leading-snug tracking-[-0.01em] text-white/90 sm:mt-3 sm:text-base lg:text-[1.05rem]">
                {h.heroSubtitle}
              </p>

              <div className="animate-fade-up animate-delay-2 mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
                <Link
                  href="/konfigurator"
                  className="inline-flex h-10 min-w-[10.5rem] items-center justify-center rounded-full bg-sky px-5 text-sm font-semibold tracking-tight text-white shadow-[0_4px_16px_-4px_rgba(26,140,255,0.7)] ring-1 ring-white/15 transition-all duration-300 hover:bg-[#0f7ae6] hover:shadow-[0_6px_20px_-4px_rgba(26,140,255,0.8)] sm:h-11 sm:min-w-[11.5rem] sm:px-6"
                >
                  {h.configuratorCta}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 min-w-[10.5rem] items-center justify-center rounded-full bg-amber-400 px-5 text-sm font-semibold tracking-tight text-anthracite-950 shadow-[0_4px_16px_-4px_rgba(251,191,36,0.55)] ring-1 ring-amber-300/40 transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_6px_20px_-4px_rgba(251,191,36,0.65)] sm:h-11 sm:min-w-[11.5rem] sm:px-6"
                >
                  {h.contactCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three cards */}
      <section className="bg-[#f4f7fb]">
        <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-4 lg:gap-5">
            {pillars.map((p, i) => {
              const block = o[p.key];
              return (
                <Link
                  id={p.id}
                  key={p.id}
                  href={p.href}
                  className={`animate-fade-up group flex flex-col overflow-hidden rounded-xl border border-anthracite-200/80 bg-white shadow-[0_2px_10px_-4px_rgba(6,16,28,0.1)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-[0_14px_28px_-12px_rgba(6,16,28,0.18)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    i === 1
                      ? "animate-delay-1"
                      : i === 2
                        ? "animate-delay-2"
                        : ""
                  }`}
                >
                  <div className="bg-accent px-3.5 py-2">
                    <h2 className="flex items-center justify-between gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white sm:text-[13px]">
                      <span>{block.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
                    </h2>
                  </div>
                  <div className="relative aspect-[16/10] bg-anthracite-50">
                    <Image
                      src={images[p.image]}
                      alt={block.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={80}
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-3.5 py-3.5 sm:px-4 sm:py-4">
                    <p className="text-[13px] leading-relaxed text-anthracite-600 sm:text-sm">
                      {block.body}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
