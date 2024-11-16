import { z } from "zod"
import { useTranslations } from "next-intl"

export const useResourceSchema = () => {
  const t = useTranslations("ResourcePage.form")

  return z.object({
    category_id: z.string({
      required_error: t("category_id.validation.required"),
    }),
    children: z
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
          factor: z
            .string()
            .optional()
            .transform((val) => (val === "" ? "1" : val))
            .refine(
              (val) =>
                val === undefined ||
                (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
              t("factor.validation.positive")
            )
            .transform((val) =>
              val ? parseFloat(parseFloat(val).toFixed(2)) : 1
            ),
        })
      )
      .optional(),
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
      .optional()
      .transform((val) => (val === "" ? "0" : val))
      .refine(
        (val) => val === undefined || !isNaN(parseFloat(val)),
        t("output.validation.number")
      )
      .transform((val) => (val ? parseFloat(val) : 0)),
    prices: z.array(
      z.object({
        basic_rate: z
          .string()
          .min(1, t("basic_rate.validation.required"))
          .refine(
            (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
            t("basic_rate.validation.positive")
          )
          .transform((val) => parseFloat(parseFloat(val).toFixed(2))),
        currency_id: z.string().optional(),
        factor: z
          .string()
          .optional()
          .transform((val) => (val === "" ? "1" : val))
          .refine(
            (val) =>
              val === undefined ||
              (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
            t("factor.validation.positive")
          )
          .transform((val) =>
            val ? parseFloat(parseFloat(val).toFixed(2)) : 1
          ),
      })
    ),
    remarks: z.string().optional(),
    sub_category_id: z.string({
      required_error: t("sub_category_id.validation.required"),
    }),
    unit_id: z.string({ required_error: t("unit_id.validation.required") }),
  })
}

export const updateResourcesSchema = z.object({
  resources: z.array(
    z.object({
      id: z.string(),
      prices: z.array(
        z.object({
          currency_id: z.string().optional(),
          basic_rate: z
            .string()
            .min(1)
            .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0)
            .transform((val) => parseFloat(parseFloat(val).toFixed(2))),
          factor: z
            .string()
            .optional()
            .transform((val) => (val === "" ? "1" : val))
            .refine(
              (val) =>
                val === undefined ||
                (!isNaN(parseFloat(val)) && parseFloat(val) > 0)
            )
            .transform((val) =>
              val ? parseFloat(parseFloat(val).toFixed(2)) : 1
            ),
        })
      ),
      children: z
        .array(
          z.object({
            child_resource_id: z.string(),
            qty: z
              .string()
              .min(1)
              .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0)
              .transform((val) => parseInt(val)),
            factor: z
              .string()
              .optional()
              .transform((val) => (val === "" ? "1" : val))
              .refine(
                (val) =>
                  val === undefined ||
                  (!isNaN(parseFloat(val)) && parseFloat(val) > 0)
              )
              .transform((val) =>
                val ? parseFloat(parseFloat(val).toFixed(2)) : 1
              ),
          })
        )
        .optional(),
    })
  ),
})

export type UpdateResourcesSchema = z.input<typeof updateResourcesSchema>

export type ResourceSchema = ReturnType<typeof useResourceSchema>
export type ResourceFormData = z.input<ResourceSchema>

export type ResourceStateData = {
  id: string
  active: boolean
  children?: {
    child_resource_id: string
    qty: number
    factor: number
  }[]
  prices: {
    basic_rate: number
    factor: number
    currency_id: string
  }[]
}
