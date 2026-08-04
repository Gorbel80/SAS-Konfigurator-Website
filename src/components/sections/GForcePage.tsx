import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight, Gauge, Hand, Move3d } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
};

const cardMeta = [
  { key: "balancers" as const, image: "lifts" as const, icon: Gauge },
  { key: "controls" as const, image: "service" as const, icon: Hand },
  { key: "easyArm" as const, image: "side" as const, icon: Move3d },
];

/** Product page: G-Force balancers, controls, Easy Arm */
export function GForcePage({ content, images }: Props) {
  const p = content.gforcePage;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageHeroBanner
        imageSrc={images.hero}
        imageAlt={p.heroTitle}
        eyebrow={p.heroEyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
        compact
      >
        <Link
          href="/konfigurator"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
        >
          {p.configuratorCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/12"
        >
          {p.ctaLabel}
        </Link>
      </PageHeroBanner>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="animate-fade-up mx-auto max-w-3xl text-center text-sm leading-relaxed text-anthracite-600 sm:text-base">
          {p.intro}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cardMeta.map((meta, i) => {
            const card = p[meta.key];
            const Icon = meta.icon;
            return (
              <article
                key={meta.key}
                className={`animate-fade-up card-lift overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${
                  i === 1 ? "animate-delay-1" : i === 2 ? "animate-delay-2" : ""
                }`}
              >
                <div className="img-zoom relative aspect-[16/11] bg-anthracite-50">
                  <Image
                    src={images[meta.image]}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={78}
                  />
                </div>
                <div className="border-t border-border p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <h2 className="text-sm font-semibold tracking-tight text-anthracite-900 sm:text-base">
                      {card.title}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-anthracite-500">
                    {card.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="animate-fade-up animate-delay-2 mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-5 sm:p-7 lg:p-8">
              <h2 className="text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
                {p.heroTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-anthracite-600 sm:text-[0.9375rem]">
                {p.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/konfigurator"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-anthracite-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
                >
                  {p.configuratorCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/service"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-anthracite-800 transition-colors hover:bg-anthracite-50"
                >
                  {content.nav.service}
                </Link>
              </div>
            </div>
            <div className="relative min-h-[220px] border-t border-border bg-anthracite-50 lg:border-l lg:border-t-0">
              <Image
                src={images.lifts}
                alt={p.heroTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={78}
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-3 mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
            {p.specsTitle}
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-anthracite-900 text-white">
                  {p.specsHeaders.map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold first:rounded-tl-2xl last:rounded-tr-2xl">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.specs.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-surface" : "bg-anthracite-50/70"}
                  >
                    <th className="px-4 py-2.5 font-medium text-anthracite-800">
                      {row.label}
                    </th>
                    {row.values.map((v) => (
                      <td
                        key={`${row.label}-${v}`}
                        className="px-4 py-2.5 tabular-nums text-anthracite-600"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
