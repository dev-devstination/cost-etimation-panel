import { Plus } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import { LocalizedPageProps } from "@/types"
import { getActivities } from "@/features/activities/lib/get-activities"
import { getActivityCategories } from "@/features/activities/lib/get-activity-categories"
import { getActivitySubcategories } from "@/features/activities/lib/get-activity-subcategory"
import { UpdateActivitiesTable } from "@/features/activities/components/activities/table/update-activities-table"

interface ActivitiesPageProps extends LocalizedPageProps {
  searchParams: {
    category?: string
    subcategory?: string
    active?: string
  }
}

const ActivitiesPage: React.FC<ActivitiesPageProps> = async ({
  params: { locale },
  searchParams,
}) => {
  setRequestLocale(locale)
  const t = await getTranslations("ActivitiesPage")

  const { activities } = await getActivities({
    categoryId: searchParams.category,
    subcategoryId: searchParams.subcategory,
    active: searchParams.active,
  })

  const { categoriesOptions } = await getActivityCategories()
  const { subcategoriesOptions } = await getActivitySubcategories()

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button asChild>
            <Link href="/activities/new">
              <Plus className="size-4 ltr:mr-2 rtl:ml-2" /> {t("actions.add")}
            </Link>
          </Button>
        </div>
      </div>

      <UpdateActivitiesTable
        activities={activities}
        categoriesOptions={categoriesOptions}
        subcategoriesOptions={subcategoriesOptions}
      />
    </>
  )
}

export default ActivitiesPage
