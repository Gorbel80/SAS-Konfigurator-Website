import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
import type { LocaleContent, SiteContent } from "@/content/types";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

/** Pillars → real subpages */
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

export function HomePage({ content, images }: Props) {
  const o = content.offerings;
  const h = content.home;

  return (
    <div className="flex-1 bg-background">
      <PageHeroBanner
        imageSrc={images.hero}
        imageAlt={h.heroTitle}
        eyebrow={h.eyebrow}
        title={h.heroTitle}
        subtitle={h.heroSubtitle}
        badge="G-Force®"
      >
        <ConfiguratorButton
          label="3D Konfigurator"
          hint="Öffnen"
          size="hero"
        />
        <Link
          href="/contact"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/12 sm:h-11"
        >
          {h.contactCta}
          <ArrowRight className="h-4 w-4 opacity-90" />
        </Link>
      </PageHeroBanner>

      {/* Three strong content blocks */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
          <div className="animate-fade-up mb-4 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
              {o.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-anthracite-500">
              {o.intro}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-3 lg:gap-3.5">
            {pillars.map((p, i) => {
              const block = o[p.key];
              return (
                <Link
                  id={p.id}
                  key={p.id}
                  href={p.href}
                  className={`animate-fade-up card-lift group scroll-mt-32 overflow-hidden rounded-xl border border-border bg-background shadow-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    i === 1
                      ? "animate-delay-1"
                      : i === 2
                        ? "animate-delay-2"
                        : ""
                  }`}
                >
                  <div className="img-zoom relative aspect-[16/9]">
                    <Image
                      src={images[p.image]}
                      alt={block.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={75}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite-950/85 via-anthracite-950/40 to-transparent px-3.5 pb-2.5 pt-8">
                      <h3 className="flex items-center justify-between gap-2 text-sm font-semibold tracking-wide text-white">
                        <span>{block.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
                      </h3>
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <p className="text-sm leading-snug text-anthracite-500 line-clamp-3">
                      {block.body}
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
                      {block.title}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="animate-fade-up animate-delay-3 mt-4 rounded-lg border border-accent/15 bg-accent-muted/70 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-anthracite-700 sm:text-sm">
            {o.journeyNote}
          </p>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
          <div className="animate-fade-up mb-4 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Europa
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
              {h.offerTitle}
            </h2>
          </div>

          <div className="animate-fade-up animate-delay-1 grid gap-2.5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
            <div className="card-lift flex flex-col rounded-xl border border-anthracite-200 bg-surface px-4 py-3.5 shadow-sm lg:rounded-r-none lg:border-r-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-anthracite-200/90 text-anthracite-700">
                  <AlertCircle className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-anthracite-500">
                  {h.problemLabel}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-anthracite-700">
                {h.offerParts}
              </p>
            </div>

            <div
              className="flex shrink-0 items-center justify-center py-0.5 lg:w-10"
              aria-hidden
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-md">
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </div>

            <div className="card-lift flex flex-col rounded-xl border border-sky/25 bg-accent-muted/60 px-4 py-3.5 shadow-sm lg:rounded-l-none lg:border-l-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                  {h.solutionLabel}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-anthracite-800">
                {h.offerService}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2.5 px-4 py-6 text-center sm:px-6 sm:py-7 lg:px-8">
          <h2 className="animate-fade-up max-w-xl text-base font-semibold tracking-tight text-anthracite-900 sm:text-lg">
            {h.sloganPrimary}
          </h2>
          <p className="animate-fade-up animate-delay-1 max-w-lg text-sm text-anthracite-500">
            {h.sloganSecondary}
          </p>
          <div className="animate-fade-up animate-delay-2 mt-1 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-anthracite-900 px-4.5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
            >
              {o.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
