import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow={content.service.eyebrow}
              title={content.service.title}
              subtitle={content.service.intro}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src={images.service}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface border-y border-border pt-16 md:pt-24">
        <Reveal>
          <SectionHeading
            title={content.service.helpTitle}
            subtitle={content.service.helpIntro}
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2">
          {content.service.helpItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <Card hover className="h-full">
                <h3 className="text-lg font-semibold text-anthracite-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                  {item.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <SectionHeading
            title={content.service.processTitle}
            subtitle={content.service.processSubtitle}
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.service.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 70}>
              <div className="relative h-full rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <div className="mb-4 h-1.5 w-10 rounded-full bg-accent" />
                <h3 className="text-base font-semibold text-anthracite-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-anthracite-900 text-white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {content.service.devicesTitle}
            </h2>
            <p className="mt-4 text-anthracite-300">
              {content.service.devicesBody}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {content.service.devices.map((d) => (
                <li
                  key={d}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
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
          <div className="rounded-3xl border border-border bg-surface p-8 text-center shadow-sm md:p-12">
            <h2 className="text-3xl font-semibold tracking-tight text-anthracite-900">
              {content.service.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-anthracite-500">
              {content.service.ctaBody}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-hover"
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
