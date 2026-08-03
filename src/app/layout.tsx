import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Gorbel G-Force – Größtes Ersatzteillager Deutschlands | SAS × WiMa",
    template: "%s | SAS × WiMa",
  },
  description:
    "Größtes Ersatzteillager Deutschlands für Gorbel G-Force. Service und Reparatur durch WiMa und SAS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
