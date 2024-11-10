import { z } from "zod"
import { useTranslations } from "next-intl"

export const useBillSchema = () => {
  const t = useTranslations("BillsPage.form")

  return z.object({
    description: z
      .string({ required_error: t("description.validation.required") })
      .min(1, t("description.validation.required")),
    number: z
      .string()
      .min(1, t("number.validation.required"))
      .refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        t("number.validation.positive")
      ),
    project_id: z.string({
      required_error: t("project_id.validation.required"),
    }),
  })
}

export const useBillDescriptionSchema = () => {
  const schema = useBillSchema()
  return schema.pick({ description: true })
}

export const useBillNumberSchema = () => {
  const schema = useBillSchema()
  return schema.pick({ number: true })
}

export type BillDescriptionSchema = ReturnType<typeof useBillDescriptionSchema>
export type BillDescriptionFormData = z.infer<BillDescriptionSchema>

export type BillNumberSchema = ReturnType<typeof useBillNumberSchema>
export type BillNumberFormData = z.infer<BillNumberSchema>

export type BillSchema = ReturnType<typeof useBillSchema>
export type BillFormData = z.infer<BillSchema>
