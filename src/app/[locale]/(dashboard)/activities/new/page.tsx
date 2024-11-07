import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { getUnits } from "@/features/units/lib/get-units"
import { getResources } from "@/features/resources/lib/get-resources"
import { getActivityCategories } from "@/features/activities/lib/get-activity-categories"
import { getActivitySubcategories } from "@/features/activities/lib/get-activity-subcategory"
import { ActivityForm } from "@/features/activities/components/activities/activity-form"
import { getResourceCategories } from "@/features/resources/lib/get-resource-categories"
import { getResourceSubcategories } from "@/features/resources/lib/get-resource-subcategory"

const CreateNewActivityPage: React.FC<LocalizedPageProps> = async ({
  params: { locale },
}) => {
  setRequestLocale(locale)
  const t = await getTranslations("ActivitiesPage")

  const { categoriesOptions: activityCategoriesOptions } =
    await getActivityCategories()
  const { subcategoriesOptions: activitySubcategoriesOptions } =
    await getActivitySubcategories()
  const { categoriesOptions: resourceCategoriesOptions } =
    await getResourceCategories()
  const { subcategoriesOptions: resourceSubcategoriesOptions } =
    await getResourceSubcategories()
  const { unitsOptions } = await getUnits()
  const { resources } = await getResources()

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>
      <ActivityForm
        resources={resources}
        activityCategoriesOptions={activityCategoriesOptions}
        activitySubcategoriesOptions={activitySubcategoriesOptions}
        resourceCategoriesOptions={resourceCategoriesOptions}
        resourceSubcategoriesOptions={resourceSubcategoriesOptions}
        unitsOptions={unitsOptions}
      />
    </>
  )
}

export default CreateNewActivityPage
