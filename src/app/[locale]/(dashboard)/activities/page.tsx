import { Plus } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { LocalizedPageProps } from "@/types"
import { getResources } from "@/features/resources/lib/get-resources"
import { UpdateResourcesTable } from "@/features/resources/components/resources/table/update-resources-table"
import { getResourceCategories } from "@/features/resources/lib/get-resource-categories"
import { getResourceSubcategories } from "@/features/resources/lib/get-resource-subcategory"

interface ResourcesPageProps extends LocalizedPageProps {
  searchParams: {
    category?: string
    subcategory?: string
    active?: string
  }
}

const ResourcesPage: React.FC<ResourcesPageProps> = async ({
  params: { locale },
  searchParams,
}) => {
  setRequestLocale(locale)
  const t = await getTranslations("ResourcesPage")

  const { resources } = await getResources({
    categoryId: searchParams.category,
    subcategoryId: searchParams.subcategory,
    active: searchParams.active,
  })

  const { categoriesOptions } = await getResourceCategories()
  const { subcategoriesOptions } = await getResourceSubcategories()

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button asChild>
            <Link href="/resources/new">
              <Plus className="size-4 ltr:mr-2 rtl:ml-2" /> {t("actions.add")}
            </Link>
          </Button>
        </div>
      </div>

      <UpdateResourcesTable
        resources={resources}
        categoriesOptions={categoriesOptions}
        subcategoriesOptions={subcategoriesOptions}
      />
    </>
  )
}

export default ResourcesPage
