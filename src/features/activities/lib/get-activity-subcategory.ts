import { fetcherSSR } from "@/lib/api/fetcher"
import { Subcategory } from "@/types"

export const getActivitySubcategories = async () => {
  const { data: subcategories } = await fetcherSSR<Subcategory[]>(
    "/activities/subcategories"
  )

  const subcategoriesOptions = subcategories.map((subcategory) => ({
    label: subcategory.name,
    value: subcategory.id,
    category_id: subcategory.category.id,
  }))

  return { subcategoriesOptions, subcategories }
}
