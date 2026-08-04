import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Gorbel G-Force® – Größtes Ersatzteillager Deutschlands | SAS × WiMa",
    template: "%s | SAS × WiMa",
  },
  description:
    "Größtes Ersatzteillager Deutschlands für Gorbel G-Force® und Easy Arm®. Service, Seilbalancer und eigene Seil-/Kettenzüge von WiMa und SAS.",
  applicationName: "SAS × WiMa",
  authors: [{ name: "SAS × WiMa" }],
  creator: "SAS × WiMa",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "SAS × WiMa – Gorbel Service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
