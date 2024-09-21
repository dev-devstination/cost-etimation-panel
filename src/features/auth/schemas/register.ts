import { z } from "zod"
import { useTranslations } from "next-intl"

export const useRegisterSchema = () => {
  const t = useTranslations("validation")

  return z
    .object({
      firstName: z.string().min(2, t("custom.firstName.min")),
      lastName: z.string().min(2, t("custom.lastName.min")),
      email: z.string().email(t("email")),
      password: z.string().min(8, t("custom.password.min")),
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t("custom.repeatPassword.match"),
      path: ["repeatPassword"],
    })
}

export type RegisterFormData = z.infer<ReturnType<typeof useRegisterSchema>>
