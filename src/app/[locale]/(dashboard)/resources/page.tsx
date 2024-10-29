import { Plus } from "lucide-react"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { Link } from "@/config/navigation"
import { Filters } from "@/features/resources/components/filters"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/resources/components/columns"
import { Popover } from "@/features/resources/components/popover"
import { LocalizedPageProps } from "@/types"
import { getResources } from "@/features/resources/lib/get-resources"

const ResourcesPage: React.FC<LocalizedPageProps> = async ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("ResourcesPage")

  const { resources } = await getResources()

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Filters />
          <Button asChild>
            <Link href="/resources/new">
              <Plus className="size-4 ltr:mr-2 rtl:ml-2" /> {t("actions.add")}
            </Link>
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={resources} PopoverContent={Popover} />
    </>
  )
}

export default ResourcesPage
