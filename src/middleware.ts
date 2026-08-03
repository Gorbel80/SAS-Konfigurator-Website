import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip admin, API, Next internals, and static files
  matcher: ["/", "/(de|en|zh)/:path*", "/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
