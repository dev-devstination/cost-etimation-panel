import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

import { isValidLocale } from "@/config/locales"

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isValidLocale(locale)) notFound()

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
