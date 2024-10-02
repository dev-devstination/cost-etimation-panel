import { z } from "zod"
import { useTranslations } from "next-intl"

export const useRegisterSchema = () => {
  const t = useTranslations("validation")

  return z
    .object({
      email: z.string().email(t("email")),
      password: z.string().min(8, t("custom.password.min")),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("custom.repeatPassword.match"),
      path: ["repeatPassword"],
    })
}

export type RegisterFormData = z.infer<ReturnType<typeof useRegisterSchema>>
