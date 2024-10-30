import { z } from "zod"
import { useTranslations } from "next-intl"

export const useResourceSchema = () => {
  const t = useTranslations("ResourcePage.form")

  return z.object({
    basic_rate: z
      .string()
      .min(1, t("basic_rate.validation.required"))
      .refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        t("basic_rate.validation.positive")
      )
      .transform((val) => parseFloat(parseFloat(val).toFixed(2))),
    category_id: z.string({
      required_error: t("category_id.validation.required"),
    }),
    code: z
      .string({ required_error: t("code.validation.required") })
      .min(1, t("code.validation.required")),
    currency_id: z.string().optional(),
    description: z
      .string({
        required_error: t("description.validation.required"),
      })
      .min(1, t("description.validation.required")),
    factor: z
      .string()
      .optional()
      .transform((val) => (val === "" ? "1" : val))
      .refine(
        (val) =>
          val === undefined || (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
        t("factor.validation.positive")
      )
      .transform((val) => (val ? parseFloat(parseFloat(val).toFixed(2)) : 1)),
    master: z.boolean().optional().default(false),
    output: z
      .string()
      .optional()
      .transform((val) => (val === "" ? "0" : val))
      .refine(
        (val) => val === undefined || !isNaN(parseFloat(val)),
        t("output.validation.number")
      )
      .transform((val) => (val ? parseFloat(val) : 0)),
    remarks: z.string().optional(),
    resource_compositions: z
      .array(
        z.object({
          child_resource_id: z.string({
            required_error: t(
              "resource_compositions.child_resource_id.validation.required"
            ),
          }),
          qty: z
            .string()
            .min(1, t("resource_compositions.qty.validation.required"))
            .refine(
              (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
              t("resource_compositions.qty.validation.positive_integer")
            )
            .transform((val) => parseInt(val)),
        })
      )
      .optional(),
    sub_category_id: z.string({
      required_error: t("sub_category_id.validation.required"),
    }),
    unit_id: z.string({ required_error: t("unit_id.validation.required") }),
  })
}

export type ResourceSchema = ReturnType<typeof useResourceSchema>
export type ResourceFormData = z.input<ResourceSchema>
