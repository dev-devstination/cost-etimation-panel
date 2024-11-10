import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { DataTable } from "@/components/data-table"
import { columns } from "@/features/projects/components/categories/categories-table/columns"
import { AddCategoryDialog } from "@/features/projects/components/categories/add-category-dialog"
import { Category } from "@/types"

export default async function ProjectsCategoriesPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("ProjectsCategoriesPage")
  const { data: categories } = await fetcherSSR<Category[]>(
    "/projects/categories"
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
