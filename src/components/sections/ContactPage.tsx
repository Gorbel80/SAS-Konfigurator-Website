"use client";

import Image from "next/image";
import type { LocaleContent, SiteContent } from "@/content/types";
import { Mail, MapPin, Phone } from "lucide-react";
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
      `G-Force Anfrage – ${company || name}`,
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
    "h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="animate-fade-up space-y-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-anthracite-900 sm:text-[1.75rem]">
              {content.contact.title}
            </h1>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-anthracite-500">
              {content.contact.intro}
            </p>
          </div>

          <div className="img-zoom relative aspect-[2.4/1] overflow-hidden rounded-xl border border-border shadow-sm">
            <Image
              src={images.contact}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {([companies.wima, companies.sas] as const).map((c) => (
              <div
                key={c.legalName}
                className="rounded-xl border border-border bg-surface px-3.5 py-3 text-sm shadow-sm"
              >
                <p className="font-semibold tracking-tight text-anthracite-900">
                  {c.legalName}
                </p>
                <div className="mt-2 space-y-1 text-anthracite-500">
                  <p className="flex gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>
                      {c.postal} {c.city}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <a
                      href={`tel:${c.phone}`}
                      className="transition-colors hover:text-anthracite-900"
                    >
                      {c.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <a
                      href={`mailto:${c.email}`}
                      className="break-all transition-colors hover:text-anthracite-900"
                    >
                      {c.email}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="animate-fade-up animate-delay-1 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-5"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formName}
              </span>
              <input name="name" required className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formCompany}
              </span>
              <input name="company" className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formEmail}
              </span>
              <input name="email" type="email" required className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formPhone}
              </span>
              <input name="phone" className={inputClass} />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formMessage}
              </span>
              <textarea
                name="message"
                required
                rows={3}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-anthracite-900 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-anthracite-800"
          >
            {content.contact.formSubmit}
          </button>
          <p className="mt-2 text-xs leading-relaxed text-anthracite-400">
            {content.contact.formHint}
          </p>
          {sent ? (
            <p className="mt-1.5 text-sm font-medium text-success">
              {content.contact.formSuccess}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
