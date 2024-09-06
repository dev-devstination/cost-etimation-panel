import { z } from "zod"
import { useTranslations } from "next-intl"

export const useLoginSchema = () => {
  const tAuth = useTranslations("auth.form")
  const tValidation = useTranslations("validation")

  return z.object({
    email: z
      .string()
      .min(5, tValidation("minLength", { field: tAuth("email.label"), min: 5 }))
      .max(
        254,
        tValidation("maxLength", { field: tAuth("email.label"), max: 254 })
      )
      .email(tValidation("email")),
    password: z
      .string()
      .min(
        8,
        tValidation("minLength", { field: tAuth("password.label"), min: 8 })
      )
      .max(
        72,
        tValidation("maxLength", { field: tAuth("password.label"), max: 72 })
      ),
  })
}

export type LoginSchema = ReturnType<typeof useLoginSchema>
export type LoginFormData = z.infer<LoginSchema>
