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
    "h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="animate-fade-up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            SAS × WiMa
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-anthracite-900 sm:text-3xl">
            {content.contact.title}
          </h1>
          <p className="mt-2.5 max-w-md text-sm leading-relaxed text-anthracite-500">
            {content.contact.intro}
          </p>

          <div className="img-zoom relative mt-6 aspect-[21/9] overflow-hidden rounded-2xl border border-border shadow-sm">
            <Image
              src={images.contact}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="mt-5 grid gap-3">
            {([companies.wima, companies.sas] as const).map((c) => (
              <div
                key={c.legalName}
                className="card-lift rounded-2xl border border-border bg-surface p-4 text-sm shadow-sm"
              >
                <p className="font-semibold tracking-tight text-anthracite-900">
                  {c.legalName}
                </p>
                <p className="mt-2.5 flex gap-2 text-anthracite-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {c.postal} {c.city}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-anthracite-500">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`tel:${c.phone}`}
                    className="transition-colors hover:text-anthracite-900"
                  >
                    {c.phone}
                  </a>
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-anthracite-500">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${c.email}`}
                    className="break-all transition-colors hover:text-anthracite-900"
                  >
                    {c.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="animate-fade-up animate-delay-1 h-fit rounded-2xl border border-border bg-surface p-6 shadow-[0_12px_40px_-20px_rgba(18,22,27,0.25)]"
        >
          <div className="grid gap-3.5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-anthracite-700">
                {content.contact.formName}
              </span>
              <input name="name" required className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-anthracite-700">
                {content.contact.formCompany}
              </span>
              <input name="company" className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-anthracite-700">
                {content.contact.formEmail}
              </span>
              <input name="email" type="email" required className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block font-medium text-anthracite-700">
                {content.contact.formPhone}
              </span>
              <input name="phone" className={inputClass} />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block font-medium text-anthracite-700">
                {content.contact.formMessage}
              </span>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-anthracite-900 px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-anthracite-800 hover:shadow-md"
          >
            {content.contact.formSubmit}
          </button>
          <p className="mt-2.5 text-xs leading-relaxed text-anthracite-400">
            {content.contact.formHint}
          </p>
          {sent ? (
            <p className="mt-2 text-sm font-medium text-success">
              {content.contact.formSuccess}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
