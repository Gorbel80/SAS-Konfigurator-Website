import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { LocaleContent, SiteContent } from "@/content/types";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function AboutPage({ content, images, companies }: Props) {
  return (
    <>
      <Section className="pb-10 md:pb-12">
        <Reveal>
          <SectionHeading
            eyebrow={content.about.eyebrow}
            title={content.about.title}
            subtitle={content.about.intro}
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src={images.about}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/50 to-transparent" />
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="text-2xl font-semibold text-anthracite-900">
              {content.about.storyTitle}
            </h3>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-anthracite-500">
              {content.about.storyBody.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <div className="space-y-4">
              <Card className="bg-anthracite-900 text-white border-anthracite-800">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  WiMa
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {companies.wima.legalName}
                </p>
                <p className="mt-2 text-sm text-anthracite-300">
                  {content.about.wimaRole}
                </p>
                <p className="mt-4 text-sm text-anthracite-400">
                  {companies.wima.postal} {companies.wima.city}
                </p>
              </Card>
              <Card>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  SAS
                </p>
                <p className="mt-2 text-lg font-semibold text-anthracite-900">
                  {companies.sas.legalName}
                </p>
                <p className="mt-2 text-sm text-anthracite-500">
                  {content.about.sasRole}
                </p>
                <p className="mt-4 text-sm text-anthracite-400">
                  {companies.sas.postal} {companies.sas.city}
                </p>
              </Card>
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
        <div className="grid gap-4 sm:grid-cols-2">
          {content.about.facts.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 60}>
              <Card hover className="h-full">
                <p className="text-sm font-semibold text-accent">
                  0{i + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-anthracite-900">
                  {fact.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                  {fact.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
