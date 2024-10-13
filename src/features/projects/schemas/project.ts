import { z } from "zod"
import { useTranslations } from "next-intl"

export const useProjectSchema = () => {
  const t = useTranslations("ProjectsPage.form")

  return z.object({
    area: z
      .string()
      .min(1, t("area.validation.required"))
      .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: t("area.validation.invalid"),
      }),
    category_id: z.string({
      required_error: t("category_id.validation.required"),
    }),
    client_name: z.string().min(1, t("client_name.validation.required")),
    consultant_name: z
      .string()
      .min(1, t("consultant_name.validation.required")),
    currency_id: z.string({
      required_error: t("currency_id.validation.required"),
    }),
    name: z.string().min(1, t("name.validation.required")),
    queries_dead_line_date: z
      .number()
      .int()
      .positive(t("queries_dead_line_date.validation.required")),
    release_date: z
      .number()
      .int()
      .positive(t("release_date.validation.required")),
    site_visit_date: z
      .number()
      .int()
      .positive(t("site_visit_date.validation.required")),
    submission_date: z
      .number()
      .int()
      .positive(t("submission_date.validation.required")),
  })
}

export type ProjectSchema = ReturnType<typeof useProjectSchema>
export type ProjectFormData = z.infer<ProjectSchema>
