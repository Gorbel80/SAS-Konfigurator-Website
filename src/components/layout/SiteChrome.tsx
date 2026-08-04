"use client";

import { usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

/**
 * Hides public header/footer on the fullscreen configurator workshop.
 */
export function SiteChrome({
  header,
  footer,
  banner,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  banner?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isConfigurator =
    pathname === "/konfigurator" || pathname.startsWith("/konfigurator/");

  if (isConfigurator) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
      {banner}
    </>
  );
}
