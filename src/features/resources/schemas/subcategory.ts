import { z } from "zod"
import { useTranslations } from "next-intl"

export const useSubcategorySchema = () => {
  const t = useTranslations("ResourcesSubcategoriesPage.form")

  return z.object({
    name: z
      .string({ required_error: t("name.validation.required") })
      .min(1, t("name.validation.required")),
    category_id: z.string({
      required_error: t("category_id.validation.required"),
    }),
  })
}

export const useSubcategoryNameSchema = () => {
  const schema = useSubcategorySchema()
  return schema.pick({ name: true })
}

export const useSubcategoryCategorySchema = () => {
  const schema = useSubcategorySchema()
  return schema.pick({ category_id: true })
}

export type SubcategorySchema = ReturnType<typeof useSubcategorySchema>
export type SubcategoryFormData = z.infer<SubcategorySchema>

export type SubcategoryNameSchema = ReturnType<typeof useSubcategoryNameSchema>
export type SubcategoryNameFormData = z.infer<SubcategoryNameSchema>

export type SubcategoryCategorySchema = ReturnType<
  typeof useSubcategoryCategorySchema
>
export type SubcategoryCategoryFormData = z.infer<SubcategoryCategorySchema>
