import { z } from "zod"
import { useTranslations } from "next-intl"

export const useAccountSchema = () => {
  const t = useTranslations("AccountPage.form")

  return z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    sur_name: z.string().optional(),
    email: z.string().email(t("email.validation.invalid")).optional(),
    position: z.string().optional(),
    mobile: z
      .string()
      .regex(/^(\+?[1-9]\d{1,14})?$/, t("phoneNumber.validation.invalid"))
      .optional(),
    image: z.string().optional(),
  })
}

export type AccountSchema = ReturnType<typeof useAccountSchema>
export type AccountFormData = z.infer<AccountSchema>
