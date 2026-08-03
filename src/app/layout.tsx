import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SAS & WiMa – Europäischer Service für G-Force & Easy Arm",
    template: "%s | SAS × WiMa",
  },
  description:
    "Europäischer Service und Ersatzteile für Gorbel G-Force und Easy Arm. WiMa Industrie-Automation und SAS Sauer-Automation Sachsen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
