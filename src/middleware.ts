import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from '@/config/locales';
import logger from '@/lib/logger';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const start = Date.now();
  const { pathname } = request.nextUrl;

  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(
      request.nextUrl.pathname
    );

  if (!shouldHandle) return;

  const response = intlMiddleware(request);

  const duration = Date.now() - start;
  logger.logPerformance(`Request to ${pathname}`, duration);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  runtime: 'nodejs', // Specify Node.js runtime
};
