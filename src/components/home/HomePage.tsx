import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CategoryCard } from "@/components/configurator/CategoryCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import type { Locale } from "@/lib/types";
import {
  ArrowRight,
  Boxes,
  MapPin,
  ScanSearch,
  ShieldCheck,
  Warehouse,
} from "lucide-react";

export function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  const productCounts = categories.reduce(
    (acc, c) => {
      acc[c.id] = products.filter((p) => p.categoryId === c.id).length;
      return acc;
    },
    {} as Record<string, number>
  );

  const features = [
    {
      icon: Warehouse,
      title: t("feature1Title"),
      text: t("feature1Text"),
    },
    {
      icon: ShieldCheck,
      title: t("feature2Title"),
      text: t("feature2Text"),
    },
    {
      icon: ScanSearch,
      title: t("feature3Title"),
      text: t("feature3Text"),
    },
    {
      icon: MapPin,
      title: t("feature4Title"),
      text: t("feature4Text"),
    },
  ];

  const steps = [
    { title: t("flow1"), text: t("flow1Text") },
    { title: t("flow2"), text: t("flow2Text") },
    { title: t("flow3"), text: t("flow3Text") },
    { title: t("flow4"), text: t("flow4Text") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-industrial-grid text-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-anthracite-900 via-anthracite-900/95 to-anthracite-800" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sky/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <Badge tone="accent" className="mb-6 bg-accent/15 text-orange-200">
            {t("badge")}
          </Badge>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-anthracite-300 sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/configurator">
              <Button size="lg" className="shadow-lg shadow-orange-900/30">
                <Boxes className="h-5 w-5" />
                {t("ctaConfigurator")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/service-request">
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                {t("ctaService")}
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="ghost" className="text-anthracite-200 hover:bg-white/10 hover:text-white">
                {t("ctaAbout")}
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-xs text-anthracite-500">{t("disclaimerNote")}</p>
        </div>
      </section>

      {/* Capacities */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-anthracite-500">
            {t("capacitiesTitle")}
          </p>
          <div className="flex flex-wrap gap-2">
            {[75, 150, 300, 600].map((kg) => (
              <Link
                key={kg}
                href={`/configurator/g-force?capacity=${kg}`}
                className="rounded-xl border border-border bg-anthracite-50 px-5 py-3 text-center transition-colors hover:border-accent hover:bg-accent-muted"
              >
                <span className="block text-xl font-bold text-anthracite-900">
                  {kg}
                </span>
                <span className="text-xs font-medium text-anthracite-500">
                  kg
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-anthracite-900 sm:text-3xl">
          {t("featuresTitle")}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-anthracite-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Flow */}
      <section className="border-y border-border bg-anthracite-50/80">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-anthracite-900 sm:text-3xl">
            {t("flowTitle")}
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-anthracite-900 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-anthracite-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-anthracite-500">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <Link href="/configurator">
              <Button size="lg">
                {t("ctaConfigurator")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Libraries preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-anthracite-900 sm:text-3xl">
            {t("categoriesTitle")}
          </h2>
          <Link
            href="/configurator"
            className="text-sm font-semibold text-accent hover:underline"
          >
            {t("categoriesCta")} →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 3).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              locale={locale}
              productCount={productCounts[cat.id] ?? 0}
              ctaLabel={t("categoriesCta")}
            />
          ))}
        </div>
      </section>
    </>
  );
}
