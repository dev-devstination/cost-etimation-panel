import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Company } from "@/features/users/interfaces/company"
import { CompanyForm } from "@/features/users/components/company-form"
import { Currency } from "@/features/currencies/interfaces/currency"

export default async function CompanyPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("CompanyPage")
  const { data } = await fetcherSSR<Company>("/companies")

  const { data: currencies } = await fetcherSSR<Currency[]>(
    "/setting/currencies"
  )

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>
      <CompanyForm company={data} currencies={currencies} />
    </div>
  )
}
