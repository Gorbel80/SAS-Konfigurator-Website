import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ConfiguratorBrowser } from "@/components/configurator/ConfiguratorBrowser";
import { categories, getCategoryBySlug, series } from "@/data/categories";
import { products } from "@/data/products";

type Props = {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ series?: string; capacity?: string }>;
};

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryConfiguratorPage({
  params,
  searchParams,
}: Props) {
  const { locale, category: categorySlug } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;

  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const productCounts = categories.reduce(
    (acc, c) => {
      acc[c.id] = products.filter((p) => p.categoryId === c.id).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <ConfiguratorBrowser
      categories={categories}
      products={products}
      series={series}
      activeCategorySlug={category.slug}
      initialSeriesSlug={sp.series}
      initialCapacity={sp.capacity ? Number(sp.capacity) : undefined}
      productCounts={productCounts}
    />
  );
}
