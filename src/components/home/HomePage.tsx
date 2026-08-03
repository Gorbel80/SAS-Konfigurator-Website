import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

const offerBlocks = [
  { key: "service" as const, image: "service" as const },
  { key: "parts" as const, image: "parts" as const },
  { key: "lifts" as const, image: "lifts" as const },
];

/** Home = what customers get: Service, spare parts, own lifts */
export function HomePage({ content, images }: Props) {
  const o = content.offerings;

  return (
    <div className="flex-1 bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover scale-[1.01]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/92 to-anthracite-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/40 via-transparent to-anthracite-950/20" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(217,119,6,0.25)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {content.home.eyebrow}
            </p>
          </div>

          <h1 className="animate-fade-up animate-delay-1 mt-4 max-w-3xl text-[1.85rem] font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
            {content.home.heroTitle}
          </h1>

          <p className="animate-fade-up animate-delay-2 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-anthracite-200/95 sm:text-base">
            {content.home.heroSubtitle}
          </p>

          <div className="animate-fade-up animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ConfiguratorButton
              label={content.home.configuratorLabel}
              hint={content.home.configuratorHint}
              size="hero"
            />
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/12"
            >
              {content.home.contactCta}
              <ArrowRight className="h-4 w-4 opacity-90" />
            </Link>
          </div>
        </div>
      </section>

      {/* Angebot & Leistungen — only focus of the homepage */}
      <section className="mx-auto max-w-5xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8">
        <div className="animate-fade-up mb-5 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {content.nav.products}
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-anthracite-900 sm:text-[1.35rem]">
            {o.title}
          </h2>
          <p className="mt-1.5 text-sm text-anthracite-500">{o.intro}</p>
          <p className="mt-3 rounded-lg border border-accent/15 bg-accent-muted/50 px-3 py-2 text-xs font-medium leading-relaxed text-anthracite-700 sm:text-sm">
            {o.journeyNote}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-3.5">
          {offerBlocks.map((b, i) => {
            const block = o[b.key];
            return (
              <article
                key={b.key}
                className={`animate-fade-up card-lift overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${
                  i === 1
                    ? "animate-delay-1"
                    : i === 2
                      ? "animate-delay-2"
                      : ""
                }`}
              >
                <div className="img-zoom relative aspect-[16/10]">
                  <Image
                    src={images[b.image]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="text-sm font-semibold tracking-tight text-anthracite-900">
                    {block.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-anthracite-500 sm:text-[0.8125rem]">
                    {block.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="animate-fade-up animate-delay-3 mt-6 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-anthracite-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
          >
            {o.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
