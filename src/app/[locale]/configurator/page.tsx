import { setRequestLocale } from "next-intl/server";
import { ConfiguratorBrowser } from "@/components/configurator/ConfiguratorBrowser";
import { categories, series } from "@/data/categories";
import { products } from "@/data/products";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    manufacturer?: string;
    series?: string;
    capacity?: string;
    category?: string;
  }>;
};

export default async function ConfiguratorPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;

  // Support deep links like ?manufacturer=gorbel or ?category=g-force
  const categoryFromQuery =
    sp.category ||
    (sp.manufacturer?.toLowerCase().includes("gorbel") ? "g-force" : undefined);

  // If manufacturer/category query provided, we still show overview unless
  // redirected – overview with optional deep-link focus is handled by category route.
  // Here we only apply series/capacity when no category path is used.
  const productCounts = categories.reduce(
    (acc, c) => {
      acc[c.id] = products.filter((p) => p.categoryId === c.id).length;
      return acc;
    },
    {} as Record<string, number>
  );

  // When ?category= or ?manufacturer= is set, render that category view
  return (
    <ConfiguratorBrowser
      categories={categories}
      products={products}
      series={series}
      activeCategorySlug={categoryFromQuery}
      initialSeriesSlug={sp.series}
      initialCapacity={sp.capacity ? Number(sp.capacity) : undefined}
      productCounts={productCounts}
    />
  );
}
