import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Legacy path → Leistungen */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}/leistungen`);
}
