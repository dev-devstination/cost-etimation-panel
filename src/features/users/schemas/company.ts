import { z } from "zod"
import { useTranslations } from "next-intl"

export const useCompanySchema = () => {
  const t = useTranslations("CompanyPage.form")

  return z.object({
    name: z.string().min(1, t("name.validation.required")),
    location: z.string().min(1, t("location.validation.required")),
    currency_id: z.string({
      required_error: t("currency_id.validation.required"),
    }),
    logo: z.string().optional(),
  })
}

export type CompanySchema = ReturnType<typeof useCompanySchema>
export type CompanyFormData = z.infer<CompanySchema>
