import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Workshop } from "@/components/configurator/Workshop";
import { getProductById, products } from "@/data/products";
import { getSparePartsForProduct } from "@/data/spare-parts";
import { series } from "@/data/categories";

type Props = {
  params: Promise<{ locale: string; productId: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ productId: p.id }));
}

export default async function WorkshopPage({ params }: Props) {
  const { locale, productId } = await params;
  setRequestLocale(locale);

  const product = getProductById(productId);
  if (!product) notFound();

  const parts = getSparePartsForProduct(product.id);
  // Also include parts listed on product even if filter misses
  const byId = new Map(parts.map((p) => [p.id, p]));
  // Prefer product.sparePartIds order when available
  const ordered = product.sparePartIds
    .map((id) => byId.get(id))
    .filter(Boolean) as typeof parts;

  const seriesEntry = product.seriesId
    ? series.find((s) => s.id === product.seriesId)
    : undefined;

  return (
    <Workshop
      product={product}
      parts={ordered.length ? ordered : parts}
      seriesName={seriesEntry?.name[locale as "de" | "en" | "zh"]}
      isLegacy={seriesEntry?.status === "legacy"}
    />
  );
}
