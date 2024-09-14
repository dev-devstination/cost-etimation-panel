import { Plus } from "lucide-react"
import { unstable_setRequestLocale } from "next-intl/server"
import { useTranslations } from "next-intl"

import { Link } from "@/config/navigation"
import { Filters } from "@/features/resources/components/filters"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/resources/components/columns"
import { sampleResources } from "@/features/resources/types"
import { LocalizedPageProps } from "@/types"

const ResourcesPage: React.FC<LocalizedPageProps> = ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale)

  const t = useTranslations("resources")
  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button asChild>
          <Link href="/resources/new">
            <Plus className="size-4 ltr:mr-2 rtl:ml-2" /> {t("actions.add")}
          </Link>
        </Button>
      </div>
      <div className="mb-4 flex gap-x-2">
        <Filters />
      </div>

      <DataTable
        columns={columns}
        data={sampleResources}
        filterKeys={["description"]}
      />
    </>
  )
}

export default ResourcesPage
