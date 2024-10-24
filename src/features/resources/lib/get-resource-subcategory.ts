import { fetcherSSR } from "@/lib/api/fetcher"
import { Subcategory } from "@/types"

export const getResourceSubcategories = async () => {
  const { data: subcategories } = await fetcherSSR<Subcategory[]>(
    "/resources/subcategories"
  )

  const subcategoriesOptions = subcategories.map((subcategory) => ({
    label: subcategory.name,
    value: subcategory.id,
    category_id: subcategory.category_id,
  }))

  return { subcategoriesOptions, subcategories }
}
