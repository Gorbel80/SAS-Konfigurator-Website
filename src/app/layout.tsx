import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Gorbel G-Force Service Europa – Wartung, Reparatur & Ersatzteile",
    template: "%s | G-Force Service · SAS × WiMa",
  },
  description:
    "Professioneller Service, Wartung, Reparatur und Ersatzteillieferung für Gorbel G-Force in Europa. WiMa (Wetter) und SAS (Hohndorf).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
