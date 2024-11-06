import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { DataTable } from "@/components/data-table"
import { AddSubcategoryDialog } from "@/features/resources/components/subcategories/add-subcategory-dialog"
import { columns } from "@/features/resources/components/subcategories/subcategories-table/columns"
import { Subcategory, Category } from "@/types"

export default async function SubcategoriesPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("ResourcesSubcategoriesPage")
  const { data: subcategories } = await fetcherSSR<Subcategory[]>(
    "/resources/subcategories"
  )
  const { data: categories } = await fetcherSSR<Category[]>(
    "/resources/categories"
  )

  const data = subcategories.map((subcategory) => ({
    ...subcategory,
    categories,
  }))

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>

        {/* Add Category Modal */}
        <AddSubcategoryDialog />
      </div>

      {/* Categories Table */}
      <DataTable columns={columns} data={data} />
    </div>
  )
}
