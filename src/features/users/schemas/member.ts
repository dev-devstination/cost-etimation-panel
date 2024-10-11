import { z } from "zod"
import { useTranslations } from "next-intl"

export const useMemberSchema = () => {
  const t = useTranslations("MembersPage.form")

  return z
    .object({
      email: z
        .string({ required_error: t("email.validation.required") })
        .email(t("email.validation.invalid"))
        .min(1, t("email.validation.required")),
      role: z.enum(["admin", "writer", "reader"], {
        errorMap: () => ({ message: t("role.validation.required") }),
      }),
      password: z
        .string({ required_error: t("password.validation.required") })
        .min(8, t("password.validation.min"))
        .max(72, t("password.validation.max")),
      password_confirmation: z
        .string({
          required_error: t("password_confirmation.validation.required"),
        })
        .min(1, t("password_confirmation.validation.required")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("password_confirmation.validation.match"),
      path: ["password_confirmation"],
    })
}

export type MemberSchema = ReturnType<typeof useMemberSchema>
export type MemberFormData = z.infer<MemberSchema>
