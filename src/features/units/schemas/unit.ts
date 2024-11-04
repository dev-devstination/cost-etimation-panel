import { z } from "zod"
import { useTranslations } from "next-intl"

export const useUnitSchema = () => {
  const t = useTranslations("UnitsPage.form")

  return z.object({
    name: z
      .string({ required_error: t("name.validation.required") })
      .min(1, t("name.validation.required")),
    description: z
      .string({ required_error: t("description.validation.required") })
      .min(1, t("description.validation.required")),
  })
}

export const useUnitNameSchema = () => {
  const schema = useUnitSchema()
  return schema.pick({ name: true })
}

export const useUnitDescriptionSchema = () => {
  const schema = useUnitSchema()

  return schema.pick({ description: true })
}

export type UnitNameSchema = ReturnType<typeof useUnitNameSchema>
export type UnitNameFormData = z.infer<UnitNameSchema>

export type UnitDescriptionSchema = ReturnType<typeof useUnitDescriptionSchema>
export type UnitDescriptionFormData = z.infer<UnitDescriptionSchema>

export type UnitSchema = ReturnType<typeof useUnitSchema>
export type UnitFormData = z.infer<UnitSchema>
