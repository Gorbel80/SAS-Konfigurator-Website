import { setRequestLocale, getTranslations } from "next-intl/server";
import { ServiceRequestForm } from "@/components/service/ServiceRequestForm";
import { getProductById } from "@/data/products";
import { getSparePartById } from "@/data/spare-parts";
import type { Locale } from "@/lib/types";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    productId?: string;
    sparePartId?: string;
    partNumber?: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "service" });
  return { title: t("title") };
}

export default async function ServiceRequestPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "service" });
  const loc = locale as Locale;

  const product = sp.productId ? getProductById(sp.productId) : undefined;
  const part = sp.sparePartId ? getSparePartById(sp.sparePartId) : undefined;

  const context = {
    productId: product?.id ?? sp.productId,
    productName: product ? product.name[loc] : undefined,
    sparePartId: part?.id ?? sp.sparePartId,
    sparePartName: part ? part.name[loc] : undefined,
    partNumber: part?.partNumber ?? sp.partNumber,
    capacity: product ? String(product.capacity) : undefined,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-anthracite-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-anthracite-500">{t("subtitle")}</p>
      <div className="mt-10">
        <ServiceRequestForm context={context} />
      </div>
    </div>
  );
}
