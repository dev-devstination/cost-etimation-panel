import { z } from "zod"
import { useTranslations } from "next-intl"

export const useDivisionSchema = () => {
  const t = useTranslations("DivisionsPage.form")

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

export const useDivisionDescriptionSchema = () => {
  const schema = useDivisionSchema()
  return schema.pick({ description: true })
}

export const useDivisionNumberSchema = () => {
  const schema = useDivisionSchema()
  return schema.pick({ number: true })
}

export type DivisionDescriptionSchema = ReturnType<
  typeof useDivisionDescriptionSchema
>
export type DivisionDescriptionFormData = z.infer<DivisionDescriptionSchema>

export type DivisionNumberSchema = ReturnType<typeof useDivisionNumberSchema>
export type DivisionNumberFormData = z.infer<DivisionNumberSchema>

export type DivisionSchema = ReturnType<typeof useDivisionSchema>
export type DivisionFormData = z.infer<DivisionSchema>
