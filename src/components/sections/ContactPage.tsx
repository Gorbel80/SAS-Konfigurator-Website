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

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-anthracite-900 sm:text-3xl">
            {content.contact.title}
          </h1>
          <p className="mt-2 text-sm text-anthracite-500">
            {content.contact.intro}
          </p>

          <div className="relative mt-5 aspect-[21/9] overflow-hidden rounded-xl border border-border">
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
                className="rounded-xl border border-border bg-surface p-4 text-sm"
              >
                <p className="font-semibold text-anthracite-900">{c.legalName}</p>
                <p className="mt-2 flex gap-2 text-anthracite-500">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {c.postal} {c.city}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-anthracite-500">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <a href={`tel:${c.phone}`}>{c.phone}</a>
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-anthracite-500">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <a href={`mailto:${c.email}`} className="break-all">
                    {c.email}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-1">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formName}
              </span>
              <input
                name="name"
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formCompany}
              </span>
              <input
                name="company"
                className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formEmail}
              </span>
              <input
                name="email"
                type="email"
                required
                className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formPhone}
              </span>
              <input
                name="phone"
                className="h-10 w-full rounded-xl border border-border bg-background px-3 outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-anthracite-700">
                {content.contact.formMessage}
              </span>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 outline-none focus:border-accent"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            {content.contact.formSubmit}
          </button>
          <p className="mt-2 text-xs text-anthracite-400">
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
