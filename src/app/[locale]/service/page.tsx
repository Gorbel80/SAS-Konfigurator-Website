import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Legacy path → Angebot (product/service offerings) */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/angebot`);
}
