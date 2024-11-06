import { setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"

import { LocalizedPageProps } from "@/types"

export default function HomePage({ params: { locale } }: LocalizedPageProps) {
  setRequestLocale(locale)

  const t = useTranslations("HomePage")
  return <h1>{t("title")}</h1>
}
