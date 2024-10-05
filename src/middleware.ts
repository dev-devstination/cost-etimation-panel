import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales } from "@/config/locales"
import logger from "@/lib/logger"

import { COOKIES } from "./constants"

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,
})

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"
const tokenCache = new Map<string, { isValid: boolean; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function validateToken(token: string): Promise<boolean> {
  const cachedResult = tokenCache.get(token)
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.isValid
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const isValid = response.ok
    tokenCache.set(token, { isValid, timestamp: Date.now() })
    return isValid
  } catch (error) {
    logger.error("Error validating token", { error })
    return false
  }
}

export default async function middleware(request: NextRequest) {
  const start = Date.now()
  const { pathname } = request.nextUrl

  // Check if the pathname is for a public route (login or register)
  const isPublicRoute = /^\/(?:en|ar)\/(?:login|register)(?:\/|$)/.test(
    pathname
  )

  const shouldHandle =
    pathname === "/" ||
    new RegExp(`^/(${locales.join("|")})(/.*)?$`).test(request.nextUrl.pathname)

  if (!shouldHandle) return

  const response = intlMiddleware(request)

  // For non-public routes, check for authentication
  // if (!isPublicRoute) {
  //   const token = request.cookies.get(COOKIES.AUTH_TOKEN)?.value

  //   if (token) {
  //     const isValidToken = await validateToken(token)

  //     if (!isValidToken) {
  //       logger.warn("Invalid token detected", { path: pathname })
  //       const locale = pathname.split("/")[1] || defaultLocale
  //       return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  //     }
  //   } else {
  //     logger.warn("No token found for protected route", { path: pathname })
  //     const locale = pathname.split("/")[1] || defaultLocale
  //     return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  //   }
  // }

  const duration = Date.now() - start
  logger.logPerformance(`Request to ${pathname}`, duration)

  return response
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  runtime: "nodejs", // Specify Node.js runtime
}
