import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

/** Legacy: Angebot content lives on the homepage */
export default async function Page({ params }: Props) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
