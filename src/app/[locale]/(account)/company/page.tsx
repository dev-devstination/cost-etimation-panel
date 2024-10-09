import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Company } from "@/features/users/interfaces/company"
import { CompanyForm } from "@/features/users/components/company-form"

export default async function CompanyPage({
  params: { locale },
}: LocalizedPageProps) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("CompanyPage")
  const { data } = await fetcherSSR<Company>("/companies")

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>
      <CompanyForm company={data} />
    </div>
  )
}
