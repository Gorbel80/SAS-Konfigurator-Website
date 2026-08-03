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
};

export function ServicePage({ content, images }: Props) {
  return (
    <>
      <PageHero
        eyebrow={content.service.eyebrow}
        title={content.service.title}
        subtitle={content.service.intro}
      >
        <div className="img-zoom relative mt-5 max-w-xl aspect-[21/9] overflow-hidden rounded-xl border border-border">
          <Image
            src={images.service}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 36rem"
          />
        </div>
      </PageHero>

      <Section>
        <Reveal>
          <SectionHeading
            title={content.service.helpTitle}
            subtitle={content.service.helpIntro}
          />
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2">
          {content.service.helpItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 40}>
              <Card hover className="h-full p-4">
                <h3 className="text-base font-semibold text-anthracite-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-anthracite-500">
                  {item.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface border-y border-border">
        <Reveal>
          <SectionHeading
            title={content.service.processTitle}
            subtitle={content.service.processSubtitle}
          />
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.service.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 40}>
              <div className="h-full rounded-xl border border-border bg-background p-4">
                <div className="mb-3 h-1 w-8 rounded-full bg-accent" />
                <h3 className="text-sm font-semibold text-anthracite-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-anthracite-500">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-anthracite-900 text-white">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {content.service.devicesTitle}
            </h2>
            <p className="mt-3 text-sm text-anthracite-300 md:text-base">
              {content.service.devicesBody}
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {content.service.devices.map((d) => (
                <li
                  key={d}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={images.workshop}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <div className="rounded-2xl border border-border bg-surface p-6 text-center shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight text-anthracite-900">
              {content.service.ctaTitle}
            </h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-sm text-anthracite-500">
              {content.service.ctaBody}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              {content.service.ctaButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
