import { z } from "zod"
import { useTranslations } from "next-intl"

export const useActivitySchema = () => {
  const t = useTranslations("ActivitiesPage.form")

  return z.object({
    category_id: z.string({
      required_error: t("category_id.validation.required"),
    }),
    children: z
      .array(
        z.object({
          resource_id: z.string({
            required_error: t(
              "activity_compositions.child_resource_id.validation.required"
            ),
          }),
          qty: z
            .string()
            .min(1, t("activity_compositions.qty.validation.required"))
            .refine(
              (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
              t("activity_compositions.qty.validation.positive_integer")
            )
            .transform((val) => parseInt(val)),
        })
      )
      .min(1, t("activity_compositions.validation.min_length")),
    code: z
      .string({ required_error: t("code.validation.required") })
      .min(1, t("code.validation.required")),
    description: z
      .string({
        required_error: t("description.validation.required"),
      })
      .min(1, t("description.validation.required")),
    master: z.boolean().optional().default(false),
    output: z
      .string()
      .transform((val) => (val === "" ? "0" : val))
      .refine(
        (val) => val === undefined || !isNaN(parseFloat(val)),
        t("output.validation.number")
      )
      .transform((val) => (val ? parseFloat(val) : 0)),
    remarks: z.string().optional(),
    sub_category_id: z.string({
      required_error: t("sub_category_id.validation.required"),
    }),
    unit_id: z.string({ required_error: t("unit_id.validation.required") }),
  })
}

export const updateActivitiesSchema = z.object({
  activities: z.array(
    z.object({
      id: z.string(),
      output: z
        .string()
        .transform((val) => (val === "" ? "0" : val))
        .refine((val) => val === undefined || !isNaN(parseFloat(val)))
        .transform((val) => (val ? parseFloat(val) : 0)),
      children: z
        .array(
          z.object({
            resource_id: z.string(),
            qty: z
              .string()
              .min(1)
              .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0)
              .transform((val) => parseInt(val)),
          })
        )
        .min(1),
    })
  ),
})

export type UpdateActivitiesSchema = z.input<typeof updateActivitiesSchema>

export type ActivitySchema = ReturnType<typeof useActivitySchema>
export type ActivityFormData = z.input<ActivitySchema>

export type ActivityStateData = {
  id: string
  active: boolean
  children: {
    resource_id: string
    qty: number
  }[]
}
