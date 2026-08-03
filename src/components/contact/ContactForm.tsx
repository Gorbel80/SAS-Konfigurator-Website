"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Kontaktanfrage / Contact`,
      ``,
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      ``,
      form.message,
    ].join("\n");

    window.location.href = `mailto:info@sas-mail.de?subject=${encodeURIComponent(
      `Kontakt: ${form.company || form.name}`
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <p className="mt-3 text-anthracite-700">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-semibold text-anthracite-900">
        {t("formTitle")}
      </h2>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t("name")}</span>
        <Input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t("company")}</span>
        <Input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t("email")}</span>
        <Input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t("message")}</span>
        <Textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>
      <Button type="submit" size="lg">
        {t("submit")}
      </Button>
    </form>
  );
}
