import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/activities/components/categories/categories-table/columns"
import { AddCategoryDialog } from "@/features/activities/components/categories/add-category-dialog"
import { Category } from "@/types"

export default async function CategoriesPage({
  params: { locale },
}: LocalizedPageProps) {
  unstable_setRequestLocale(locale)
  const t = await getTranslations("ActivitiesCategoriesPage")
  const { data: categories } = await fetcherSSR<Category[]>(
    "/activities/categories"
  )

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Category Modal */}
        <AddCategoryDialog />
      </div>

      {/* Categories Table */}
      <DataTable columns={columns} data={categories} />
    </div>
  )
}
