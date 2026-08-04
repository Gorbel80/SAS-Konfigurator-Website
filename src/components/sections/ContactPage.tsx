"use client";

import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import type { LocaleContent, SiteContent } from "@/content/types";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
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
      `G-Force® Anfrage – ${company || name}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Unternehmen: ${company}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone}`,
        "",
        message,
      ].join("\n"),
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputClass =
    "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15";

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageHeroBanner
        imageSrc={images.contact}
        eyebrow={content.contact.heroEyebrow}
        title={content.contact.heroTitle}
        subtitle={content.contact.heroSubtitle}
        compact
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Type-plate CTA strip */}
        <div className="animate-fade-up mb-6 flex flex-col gap-3 rounded-2xl border border-accent/20 bg-accent-muted/50 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Camera className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-anthracite-900">
              {content.home.serviceCtaTitle}
            </p>
            <p className="mt-0.5 text-sm text-anthracite-600">
              {content.home.serviceCtaBody}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <div className="animate-fade-up mb-3">
              <h2 className="text-lg font-semibold tracking-tight text-anthracite-900">
                {content.contact.title}
              </h2>
              <p className="mt-1 text-sm text-anthracite-500">
                {content.contact.intro}
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="animate-fade-up animate-delay-1 rounded-2xl border border-border bg-surface p-4 shadow-sm sm:p-5"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-anthracite-600">
                    {content.contact.formName}
                  </span>
                  <input name="name" required className={inputClass} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-anthracite-600">
                    {content.contact.formCompany}
                  </span>
                  <input name="company" className={inputClass} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-anthracite-600">
                    {content.contact.formEmail}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className={inputClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs font-medium text-anthracite-600">
                    {content.contact.formPhone}
                  </span>
                  <input name="phone" className={inputClass} />
                </label>
                <label className="block text-sm sm:col-span-2">
                  <span className="mb-1 block text-xs font-medium text-anthracite-600">
                    {content.contact.formMessage}
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15"
                    placeholder={content.home.serviceCtaBody}
                  />
                </label>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-lg bg-anthracite-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
                >
                  {content.contact.formSubmit}
                </button>
                <p className="text-xs text-anthracite-400">
                  {content.contact.formHint}
                </p>
              </div>
              {sent ? (
                <p className="mt-2 text-sm font-medium text-success">
                  {content.contact.formSuccess}
                </p>
              ) : null}
            </form>
          </div>

          <div className="animate-fade-up animate-delay-2 space-y-3">
            {([companies.wima, companies.sas] as const).map((c) => (
              <div
                key={c.legalName}
                className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-sm"
              >
                <p className="text-sm font-semibold tracking-tight text-anthracite-900">
                  {c.name}
                </p>
                <p className="mt-2.5 flex items-start gap-2 text-sm text-anthracite-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {c.street}
                    <br />
                    {c.postal} {c.city}
                  </span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-anthracite-500">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`tel:${c.phone}`}
                    className="hover:text-anthracite-900"
                  >
                    {c.phone}
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-anthracite-500">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${c.email}`}
                    className="truncate hover:text-anthracite-900"
                  >
                    {c.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
