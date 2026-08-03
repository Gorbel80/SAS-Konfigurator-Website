"use client";

import type { LocaleContent, SiteContent } from "@/content/types";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function ContactPage({ content, companies }: Props) {
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
    "h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15";

  return (
    <div className="flex flex-1 flex-col justify-center bg-background py-4 sm:py-5">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="animate-fade-up mb-3 text-center sm:mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            SAS × WiMa
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-anthracite-900 sm:text-2xl">
            {content.contact.title}
          </h1>
          <p className="mx-auto mt-1 max-w-md text-sm text-anthracite-500">
            {content.contact.intro}
          </p>
        </div>

        {/* 1. Form first */}
        <form
          onSubmit={onSubmit}
          className="animate-fade-up animate-delay-1 rounded-xl border border-border bg-surface p-3.5 shadow-sm sm:p-4"
        >
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
            <label className="block text-sm">
              <span className="mb-0.5 block text-xs font-medium text-anthracite-600">
                {content.contact.formName}
              </span>
              <input name="name" required className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-0.5 block text-xs font-medium text-anthracite-600">
                {content.contact.formCompany}
              </span>
              <input name="company" className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-0.5 block text-xs font-medium text-anthracite-600">
                {content.contact.formEmail}
              </span>
              <input name="email" type="email" required className={inputClass} />
            </label>
            <label className="block text-sm">
              <span className="mb-0.5 block text-xs font-medium text-anthracite-600">
                {content.contact.formPhone}
              </span>
              <input name="phone" className={inputClass} />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-0.5 block text-xs font-medium text-anthracite-600">
                {content.contact.formMessage}
              </span>
              <textarea
                name="message"
                required
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15"
              />
            </label>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <button
              type="submit"
              className="inline-flex h-9 items-center rounded-lg bg-anthracite-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
            >
              {content.contact.formSubmit}
            </button>
            <p className="text-xs text-anthracite-400">
              {content.contact.formHint}
            </p>
          </div>
          {sent ? (
            <p className="mt-1.5 text-sm font-medium text-success">
              {content.contact.formSuccess}
            </p>
          ) : null}
        </form>

        {/* 2. Company cards below — side by side to save height */}
        <div className="animate-fade-up animate-delay-2 mt-3 grid gap-2.5 sm:grid-cols-2 sm:mt-3.5">
          {([companies.wima, companies.sas] as const).map((c) => (
            <div
              key={c.legalName}
              className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm"
            >
              <p className="text-sm font-semibold tracking-tight text-anthracite-900">
                {c.name}
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-anthracite-500">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                {c.postal} {c.city}
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-anthracite-500">
                <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
                <a href={`tel:${c.phone}`} className="hover:text-anthracite-900">
                  {c.phone}
                </a>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-anthracite-500">
                <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
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
  );
}
