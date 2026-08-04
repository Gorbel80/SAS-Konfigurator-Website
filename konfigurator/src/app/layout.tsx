import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "G-Force Konfigurator | SAS × WiMa",
    template: "%s | SAS × WiMa",
  },
  description:
    "3D G-Force Konfigurator – Parts Library, Geräteansicht und Partlist (SAS × WiMa).",
  applicationName: "G-Force Konfigurator",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
