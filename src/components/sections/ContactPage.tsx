"use client";

import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function ContactPage({ content, images, companies }: Props) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");

    const to = companies.sas.email;
    const subject = encodeURIComponent(
      `Service-Anfrage Gorbel G-Force – ${company || name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Unternehmen: ${company}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone}`,
        "",
        "Anliegen:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const locations = [
    { key: "wima", data: companies.wima },
    { key: "sas", data: companies.sas },
  ] as const;

  return (
    <>
      <Section className="pb-8">
        <Reveal>
          <SectionHeading
            eyebrow={content.contact.eyebrow}
            title={content.contact.title}
            subtitle={content.contact.intro}
          />
        </Reveal>
        <Reveal delay={60}>
          <div className="relative mb-12 aspect-[21/8] overflow-hidden rounded-2xl border border-border">
            <Image
              src={images.contact}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-anthracite-950/35" />
          </div>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-lg font-semibold text-anthracite-900">
              {content.contact.locationsTitle}
            </h3>
            {locations.map(({ key, data }, i) => (
              <Reveal key={key} delay={i * 80}>
                <Card className="h-full">
                  <p className="text-base font-semibold text-anthracite-900">
                    {data.legalName}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-anthracite-500">
                    <p className="flex gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        {data.street}
                        <br />
                        {data.postal} {data.city}
                        <br />
                        {data.country}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4 shrink-0 text-accent" />
                      <a href={`tel:${data.phone}`} className="hover:text-anthracite-900">
                        {data.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-accent" />
                      <a
                        href={`mailto:${data.email}`}
                        className="hover:text-anthracite-900 break-all"
                      >
                        {data.email}
                      </a>
                    </p>
                  </div>
                  <a
                    href={data.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-anthracite-900 hover:text-accent"
                  >
                    Google Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Card>
              </Reveal>
            ))}

            <Reveal delay={160}>
              <Card className="bg-accent-muted border-accent/20">
                <p className="text-sm font-semibold text-anthracite-900">
                  {content.contact.hoursTitle}
                </p>
                <p className="mt-2 text-sm text-anthracite-600">
                  {content.contact.hoursBody}
                </p>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:col-span-7">
            <Card className="h-full">
              <h3 className="text-lg font-semibold text-anthracite-900">
                {content.contact.formTitle}
              </h3>
              <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm sm:col-span-1">
                  <span className="mb-1.5 block font-medium text-anthracite-700">
                    {content.contact.formName}
                  </span>
                  <input
                    name="name"
                    required
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                  />
                </label>
                <label className="block text-sm sm:col-span-1">
                  <span className="mb-1.5 block font-medium text-anthracite-700">
                    {content.contact.formCompany}
                  </span>
                  <input
                    name="company"
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                  />
                </label>
                <label className="block text-sm sm:col-span-1">
                  <span className="mb-1.5 block font-medium text-anthracite-700">
                    {content.contact.formEmail}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                  />
                </label>
                <label className="block text-sm sm:col-span-1">
                  <span className="mb-1.5 block font-medium text-anthracite-700">
                    {content.contact.formPhone}
                  </span>
                  <input
                    name="phone"
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
                  />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1.5 block font-medium text-anthracite-700">
                    {content.contact.formMessage}
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2.5 outline-none focus:border-accent"
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
                  >
                    {content.contact.formSubmit}
                  </button>
                  <p className="mt-3 text-xs text-anthracite-400">
                    {content.contact.formHint}
                  </p>
                  {sent ? (
                    <p className="mt-2 text-sm font-medium text-success">
                      {content.contact.formSuccess}
                    </p>
                  ) : null}
                </div>
              </form>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
