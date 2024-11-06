import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { AddCurrencyDialog } from "@/features/currencies/components/add-currency-dialog"
import { Currency } from "@/features/currencies/interfaces/currency"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/currencies/components/currencies-table/columns"

export default async function CurrenciesPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("CurrenciesPage")
  const { data: currencies } = await fetcherSSR<Currency[]>(
    "/setting/currencies"
  )

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Currency Modal */}
        <AddCurrencyDialog />
      </div>

      {/* Categories Table */}
      <DataTable columns={columns} data={currencies} />
    </div>
  )
}
