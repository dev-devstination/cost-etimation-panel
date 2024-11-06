import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { AddUnitDialog } from "@/features/units/components/add-unit-dialog"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/units/components/units-table/columns"
import { Unit } from "@/features/units/interfaces/unit"

export default async function UnitsPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("UnitsPage")
  const { data: units } = await fetcherSSR<Unit[]>("/setting/units")

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Unit Modal */}
        <AddUnitDialog />
      </div>

      {/* Units Table */}
      <DataTable columns={columns} data={units} />
    </div>
  )
}
