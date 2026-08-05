"use client";

import { usePathname } from "@/i18n/navigation";
import type { ReactNode } from "react";

/**
 * Marketing chrome around pages. Hidden on the fullscreen 3D configurator.
 */
export function SiteShell({
  header,
  footer,
  banner,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  banner: ReactNode;
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
      <main id="site-main">{children}</main>
      {footer}
      {banner}
    </>
  );
}
