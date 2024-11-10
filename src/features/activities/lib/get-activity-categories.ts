import { fetcherSSR } from "@/lib/api/fetcher"
import { Category } from "@/types"

export const getActivityCategories = async () => {
  const { data: categories } = await fetcherSSR<Category[]>(
    "/activities/categories"
  )

  const categoriesOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }))

  return { categoriesOptions, categories }
}
