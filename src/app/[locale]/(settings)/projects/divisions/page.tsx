import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { DataTable } from "@/components/data-table"
import { AddDivisionDialog } from "@/features/divisions/components/add-division-dialog"
import { Division } from "@/features/divisions/interfaces/division"
import { columns } from "@/features/divisions/components/divisions-table/columns"
import { getProjects } from "@/features/projects/lib/get-projects"

export default async function DivisionsPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("DivisionsPage")
  const { data: divisions } = await fetcherSSR<Division[]>("/divisions")
  const { projects } = await getProjects()

  const data = divisions.map((division) => ({
    ...division,
    projects,
  }))

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Division Modal */}
        <AddDivisionDialog />
      </div>

      {/* Divisions Table */}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
