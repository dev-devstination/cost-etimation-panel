import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { ResourceForm } from "@/features/resources/components/resource-form"
import { getResourceCategories } from "@/features/resources/lib/get-resource-categories"
import { getResourceSubcategories } from "@/features/resources/lib/get-resource-subcategory"
import { getCurrencies } from "@/features/currencies/lib/get-currencies"
import { getUnits } from "@/features/units/lib/get-units"
import { getResources } from "@/features/resources/lib/get-resources"

const CreateNewResourcePage: React.FC<LocalizedPageProps> = async ({
  params: { locale },
}) => {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("ResourcePage")

  const { categoriesOptions } = await getResourceCategories()
  const { subcategoriesOptions } = await getResourceSubcategories()
  const { currencies } = await getCurrencies()
  const { unitsOptions } = await getUnits()
  const { resources } = await getResources()

  return (
    <>
      <div className="flex flex-row items-center justify-between space-y-0 pb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>
      <ResourceForm
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
