import { setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { getResourceCategories } from "@/features/resources/lib/get-resource-categories"
import { getResourceSubcategories } from "@/features/resources/lib/get-resource-subcategory"
import { getUnits } from "@/features/units/lib/get-units"
import { getResources } from "@/features/resources/lib/get-resources"
import { getActivityById } from "@/features/activities/lib/get-activity-by-id"
import { getActivityCategories } from "@/features/activities/lib/get-activity-categories"
import { getActivitySubcategories } from "@/features/activities/lib/get-activity-subcategory"
import { ActivityForm } from "@/features/activities/components/activities/activity-form"

interface CreateNewResourcePageProps extends LocalizedPageProps {
  params: { id: string; locale: "en" | "ar" }
}

const CreateNewResourcePage: React.FC<CreateNewResourcePageProps> = async ({
  params: { locale, id },
}) => {
  setRequestLocale(locale)

  const { activity } = await getActivityById(id)
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
        <h1 className="text-2xl font-bold">{activity.description}</h1>
      </div>
      <ActivityForm
        activity={activity}
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

export default CreateNewResourcePage
