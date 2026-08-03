import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Legacy: Leistungen nav → Über uns */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/ueber-uns`);
}
