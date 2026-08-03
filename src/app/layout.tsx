import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Gorbel G-Force® – Größtes Ersatzteillager Deutschlands | SAS × WiMa",
    template: "%s | SAS × WiMa",
  },
  description:
    "Größtes Ersatzteillager Deutschlands für Gorbel G-Force® und Easy Arm®. Service und eigene Seil-/Kettenzüge von WiMa und SAS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
