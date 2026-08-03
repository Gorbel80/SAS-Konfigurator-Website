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
        <div className="absolute inset-0 opacity-40">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/85 to-anthracite-900/40" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-8 lg:py-32">
          <div className="lg:col-span-8">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {content.home.eyebrow}
            </p>
            <h1 className="animate-fade-up animate-delay-1 mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {content.home.heroTitle}
            </h1>
            <p className="animate-fade-up animate-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-anthracite-200 sm:text-lg">
              {content.home.heroSubtitle}
            </p>
            <div className="animate-fade-up animate-delay-3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-hover"
              >
                {content.home.heroCtaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/service"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                {content.home.heroCtaSecondary}
              </Link>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-4 lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-anthracite-400">
                {content.home.trustLabel}
              </p>
              <ul className="mt-4 space-y-3">
                {content.home.trustItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-anthracite-100">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
        <div className="grid gap-5 md:grid-cols-3">
          {content.home.values.map((item, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <Reveal key={item.title} delay={i * 80}>
                <Card hover className="h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-muted text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-anthracite-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-surface border-y border-border">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src={images.warehouse}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-anthracite-900 md:text-4xl">
              {content.home.storyTitle}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-anthracite-500">
              {content.home.storyBody}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-anthracite-900">
                  {companies.wima.name}
                </p>
                <p className="mt-1 text-sm text-anthracite-500">
                  {companies.wima.postal} {companies.wima.city}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-sm font-semibold text-anthracite-900">
                  {companies.sas.name}
                </p>
                <p className="mt-1 text-sm text-anthracite-500">
                  {companies.sas.postal} {companies.sas.city}
                </p>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-anthracite-900 hover:text-accent"
            >
              {content.nav.about}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-anthracite-900 text-white">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {content.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-anthracite-300">
              {content.home.ctaBody}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
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
