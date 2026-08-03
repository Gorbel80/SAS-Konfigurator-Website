"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Boxes, X } from "lucide-react";

export interface ServiceContext {
  productId?: string;
  productName?: string;
  sparePartId?: string;
  sparePartName?: string;
  partNumber?: string;
  capacity?: string;
}

interface ServiceRequestFormProps {
  context: ServiceContext;
}

export function ServiceRequestForm({ context }: ServiceRequestFormProps) {
  const t = useTranslations("service");
  const [submitted, setSubmitted] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    urgency: "normal",
    message: "",
  });

  const hasContext = Boolean(
    context.productName || context.sparePartName || context.partNumber
  );

  const mailto = useMemo(() => {
    const urgencyLabel =
      form.urgency === "critical"
        ? t("urgencyCritical")
        : form.urgency === "high"
          ? t("urgencyHigh")
          : t("urgencyNormal");

    const lines = [
      `Service-Anfrage / Service Request`,
      ``,
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
      `Urgency: ${urgencyLabel}`,
      ``,
      `--- Product context ---`,
      `Product: ${context.productName || context.productId || "—"}`,
      `Spare part: ${context.sparePartName || context.sparePartId || "—"}`,
      `Part number: ${context.partNumber || "—"}`,
      `Capacity: ${context.capacity ? `${context.capacity} kg` : "—"}`,
      ``,
      `--- Message ---`,
      form.message,
    ];

    return `mailto:info@sas-mail.de?subject=${encodeURIComponent(
      `Service-Anfrage: ${context.partNumber || context.productName || form.company || "Allgemein"}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [form, context, t]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = mailto;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h2 className="mt-4 text-xl font-semibold text-anthracite-900">
          {t("successTitle")}
        </h2>
        <p className="mt-2 text-anthracite-600">{t("successText")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            OK
          </Button>
          <Link href="/configurator">
            <Button>{t("openConfigurator")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("name")}>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label={t("company")}>
            <Input
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </Field>
          <Field label={t("email")}>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label={t("phone")}>
            <Input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
        </div>

        <Field label={t("urgency")}>
          <Select
            value={form.urgency}
            onChange={(e) => setForm({ ...form, urgency: e.target.value })}
          >
            <option value="normal">{t("urgencyNormal")}</option>
            <option value="high">{t("urgencyHigh")}</option>
            <option value="critical">{t("urgencyCritical")}</option>
          </Select>
        </Field>

        <Field label={t("message")}>
          <Textarea
            required
            placeholder={t("messagePlaceholder")}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </Field>

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {t("submit")}
        </Button>
      </form>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-anthracite-500">
              {t("contextTitle")}
            </h2>
            {hasContext && showContext ? (
              <button
                type="button"
                onClick={() => setShowContext(false)}
                className="text-anthracite-400 hover:text-anthracite-700"
                aria-label={t("clearContext")}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {hasContext && showContext ? (
            <dl className="space-y-3 text-sm">
              {context.productName || context.productId ? (
                <div>
                  <dt className="text-anthracite-400">{t("product")}</dt>
                  <dd className="font-medium text-anthracite-900">
                    {context.productName || context.productId}
                  </dd>
                </div>
              ) : null}
              {context.sparePartName || context.sparePartId ? (
                <div>
                  <dt className="text-anthracite-400">{t("part")}</dt>
                  <dd className="font-medium text-anthracite-900">
                    {context.sparePartName || context.sparePartId}
                  </dd>
                </div>
              ) : null}
              {context.partNumber ? (
                <div>
                  <dt className="text-anthracite-400">{t("partNumber")}</dt>
                  <dd className="font-mono font-semibold text-accent">
                    {context.partNumber}
                  </dd>
                </div>
              ) : null}
              {context.capacity ? (
                <div>
                  <dt className="text-anthracite-400">{t("capacity")}</dt>
                  <dd>
                    <Badge tone="sky">{context.capacity} kg</Badge>
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <div className="text-sm text-anthracite-500">
              <p>{t("noContext")}</p>
              <Link
                href="/configurator"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-accent hover:underline"
              >
                <Boxes className="h-4 w-4" />
                {t("openConfigurator")}
              </Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-anthracite-700">
        {label}
      </span>
      {children}
    </label>
  );
}
