import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "Gorbel Service Europa – G-Force & Easy Arm Reparatur & Ersatzteile",
    template: "%s | Gorbel Service · SAS × WiMa",
  },
  description:
    "Professioneller Service, Reparatur und Ersatzteile für Gorbel G-Force und Easy Arm in Europa. WiMa (Wetter) und SAS (Hohndorf).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
