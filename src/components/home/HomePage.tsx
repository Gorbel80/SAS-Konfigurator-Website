import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { LocaleContent, SiteContent } from "@/content/types";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Package,
  Wrench,
} from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function HomePage({ content, images, companies }: Props) {
  const icons = [Package, Wrench, MapPin];

  return (
    <>
      <section className="relative overflow-hidden bg-industrial-grid text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite-950 via-anthracite-900/95 to-anthracite-800/90" />
        <div className="absolute inset-0 opacity-35">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/88 to-anthracite-900/50" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <div className="lg:col-span-7">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {content.home.eyebrow}
            </p>
            <h1 className="animate-fade-up animate-delay-1 mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              {content.home.heroTitle}
            </h1>
            <p className="animate-fade-up animate-delay-2 mt-4 max-w-xl text-sm leading-relaxed text-anthracite-200 sm:text-base">
              {content.home.heroSubtitle}
            </p>
            <div className="animate-fade-up animate-delay-3 mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-hover"
              >
                {content.home.heroCtaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/service"
                className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                {content.home.heroCtaSecondary}
              </Link>
            </div>

            {/* Quick jump cards — less hunting, less scroll */}
            <div className="animate-fade-up animate-delay-4 mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              {(
                [
                  ["/", content.nav.home],
                  ["/about", content.nav.about],
                  ["/service", content.nav.service],
                ] as const
              ).map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-white/15 bg-white/5 px-2 py-2.5 text-center text-xs font-semibold text-white/90 backdrop-blur transition-colors hover:bg-white/10 sm:text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-fade-up animate-delay-4 lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-anthracite-400">
                {content.home.trustLabel}
              </p>
              <ul className="mt-3 space-y-2.5">
                {content.home.trustItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm text-anthracite-100"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-anthracite-900 transition-colors hover:bg-anthracite-100"
              >
                {content.nav.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <Reveal>
          <SectionHeading
            title={content.home.valueTitle}
            subtitle={content.home.valueSubtitle}
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {content.home.values.map((item, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <Reveal key={item.title} delay={i * 60}>
                <Card hover className="h-full p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-anthracite-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-anthracite-500">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-surface border-y border-border">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={images.warehouse}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-anthracite-900 md:text-3xl">
              {content.home.storyTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-anthracite-500 md:text-base">
              {content.home.storyBody}
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-3.5">
                <p className="text-sm font-semibold text-anthracite-900">
                  {companies.wima.name}
                </p>
                <p className="mt-0.5 text-sm text-anthracite-500">
                  {companies.wima.postal} {companies.wima.city}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-3.5">
                <p className="text-sm font-semibold text-anthracite-900">
                  {companies.sas.name}
                </p>
                <p className="mt-0.5 text-sm text-anthracite-500">
                  {companies.sas.postal} {companies.sas.city}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-anthracite-900 hover:text-accent"
              >
                {content.nav.about}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/service"
                className="inline-flex items-center gap-2 text-sm font-semibold text-anthracite-900 hover:text-accent"
              >
                {content.nav.service}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-anthracite-900 text-white">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {content.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-anthracite-300 md:text-base">
              {content.home.ctaBody}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {content.home.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
