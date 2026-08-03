import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DM_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { PageTransition } from "@/components/ui/PageTransition";
import { readContent } from "@/lib/content-store";
import type { Locale } from "@/content/types";

export const dynamic = "force-dynamic";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <html lang={locale} className={dmSans.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header
            nav={localeContent.nav}
            brand="SAS × WiMa"
            configuratorLabel={localeContent.home.configuratorLabel}
            configuratorHint={localeContent.home.configuratorHint}
          />
          <main id="site-main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer content={localeContent} companies={content.companies} />
          <CookieBanner cookies={localeContent.cookies} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
