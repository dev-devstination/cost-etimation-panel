import { z } from "zod"
import { useTranslations } from "next-intl"

export const useCategorySchema = () => {
  const t = useTranslations("ResourcesCategoriesPage.form")

  return z.object({
    name: z
      .string({ required_error: t("name.validation.required") })
      .min(1, t("name.validation.required")),
  })
}

export type CategorySchema = ReturnType<typeof useCategorySchema>
export type CategoryFormData = z.infer<CategorySchema>
