import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "SAS & WiMa – Europäischer Service & Ersatzteile für intelligente Hebezeuge",
    template: "%s | SAS × WiMa",
  },
  description:
    "Europäisches Ersatzteillager und qualifizierter Service für G-Force und Easy Arm Hebezeuge. WiMa Industrie-Automation und SAS Sauer-Automation Sachsen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
