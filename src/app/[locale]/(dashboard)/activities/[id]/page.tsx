import { setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { ResourceForm } from "@/features/resources/components/resources/resource-form"
import { getResourceCategories } from "@/features/resources/lib/get-resource-categories"
import { getResourceSubcategories } from "@/features/resources/lib/get-resource-subcategory"
import { getCurrencies } from "@/features/currencies/lib/get-currencies"
import { getUnits } from "@/features/units/lib/get-units"
import { getResources } from "@/features/resources/lib/get-resources"
import { getResourceById } from "@/features/resources/lib/get-resource-by-id"

interface CreateNewResourcePageProps extends LocalizedPageProps {
  params: { id: string; locale: "en" | "ar" }
}

const CreateNewResourcePage: React.FC<CreateNewResourcePageProps> = async ({
  params: { locale, id },
}) => {
  setRequestLocale(locale)

  const { resource } = await getResourceById(id)
  const { categoriesOptions } = await getResourceCategories()
  const { subcategoriesOptions } = await getResourceSubcategories()
  const { currencies } = await getCurrencies()
  const { unitsOptions } = await getUnits()
  const { resources } = await getResources()

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{resource.description}</h1>
      </div>
      <ResourceForm
        resource={resource}
        resources={resources}
        categories={categoriesOptions}
        subcategories={subcategoriesOptions}
        currencies={currencies}
        units={unitsOptions}
      />
    </>
  )
}

export default CreateNewResourcePage
