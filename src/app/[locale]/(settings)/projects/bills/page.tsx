import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { DataTable } from "@/components/data-table"
import { AddBillDialog } from "@/features/bills/components/add-bill-dialog"
import { Bill } from "@/features/bills/interfaces/bills"
import { columns } from "@/features/bills/components/bills-table/columns"
import { getProjects } from "@/features/projects/lib/get-projects"

export default async function BillsPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("BillsPage")
  const { data: bills } = await fetcherSSR<Bill[]>("/bills")
  const { projects } = await getProjects()

  const data = bills.map((bill) => ({
    ...bill,
    projects,
  }))

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Bill Modal */}
        <AddBillDialog />
      </div>

      {/* Bills Table */}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
