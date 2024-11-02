import { Plus } from "lucide-react"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { Link } from "@/config/navigation"
import { Filters } from "@/features/resources/components/filters"
import { Button } from "@/components/ui/button"
import { LocalizedPageProps } from "@/types"
import { getResources } from "@/features/resources/lib/get-resources"
import { UpdateResourcesTable } from "@/features/resources/components/update-resources-table"

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

      <UpdateResourcesTable resources={resources} />
    </>
  )
}

export default ResourcesPage
