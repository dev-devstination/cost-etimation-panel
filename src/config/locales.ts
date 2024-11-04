import { useLocale } from "next-intl"
import { getLocale } from "next-intl/server"

export const defaultLocale = "en"
export const locales = ["en", "ar"] as const
export type Locale = (typeof locales)[number]

export const getLocaleDirection = (locale: Locale) => {
  return locale === "ar" ? "rtl" : "ltr"
}

export const isValidLocale = (tested: string): tested is Locale => {
  return locales.includes(tested as Locale)
}

export const isRTLLanguage = async () => {
  const locale = await getLocale()
  return locale === "ar"
}

export const useIsRTLLanguage = () => {
  const locale = useLocale()
  return locale === "ar"
}
