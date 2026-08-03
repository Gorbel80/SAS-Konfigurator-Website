import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function AboutPage({ content, images, companies }: Props) {
  return (
    <>
      <PageHero
        eyebrow={content.about.eyebrow}
        title={content.about.title}
        subtitle={content.about.intro}
      />

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={images.about}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>
          <Reveal delay={60} className="lg:col-span-7">
            <h2 className="text-xl font-semibold text-anthracite-900 md:text-2xl">
              {content.about.storyTitle}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-anthracite-500 md:text-base">
              {content.about.storyBody.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface border-y border-border">
        <Reveal>
          <SectionHeading
            title={content.about.companiesTitle}
            subtitle={content.about.companiesSubtitle}
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <Card className="h-full bg-anthracite-900 text-white border-anthracite-800 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                WiMa
              </p>
              <p className="mt-2 text-lg font-semibold">{companies.wima.legalName}</p>
              <p className="mt-2 text-sm text-anthracite-300">
                {content.about.wimaRole}
              </p>
              <p className="mt-3 text-sm text-anthracite-400">
                {companies.wima.postal} {companies.wima.city}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={60}>
            <Card className="h-full p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                SAS
              </p>
              <p className="mt-2 text-lg font-semibold text-anthracite-900">
                {companies.sas.legalName}
              </p>
              <p className="mt-2 text-sm text-anthracite-500">
                {content.about.sasRole}
              </p>
              <p className="mt-3 text-sm text-anthracite-400">
                {companies.sas.postal} {companies.sas.city}
              </p>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading title={content.about.factsTitle} />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {content.about.facts.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 40}>
              <Card hover className="h-full p-4">
                <p className="text-xs font-semibold text-accent">0{i + 1}</p>
                <h3 className="mt-1 text-base font-semibold text-anthracite-900">
                  {fact.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-anthracite-500">
                  {fact.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/service"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            {content.nav.service}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-anthracite-900 hover:bg-anthracite-50"
          >
            {content.nav.contact}
          </Link>
        </div>
      </Section>
    </>
  );
}
