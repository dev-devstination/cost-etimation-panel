"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Link } from "@/config/navigation"
import { LoginFormData, useLoginSchema } from "@/features/auth/schemas/login"
import { AuthInput } from "@/features/auth/components/auth-input"
import { loginAction } from "@/features/auth/actions/login"
import { SubmitButton } from "@/components/submit-button"

const initialState = {
  errors: {},
  message: null,
}

export const LoginForm: React.FC = () => {
  const t = useTranslations("auth")
  const tForm = useTranslations("auth.form")
  const loginSchema = useLoginSchema()

  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(loginAction, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      )
      await formAction(formData)
    })
  }

  return (
    <>
      <h2 className="mb-6 text-center text-xl font-semibold text-card-foreground dark:text-white sm:text-2xl">
        {t("signInTitle")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AuthInput
          name="email"
          type="email"
          placeholder={tForm("email.label")}
          register={register}
          error={errors.email?.message || serverState.errors?.email?.[0]}
        />
        <AuthInput
          name="password"
          type="password"
          placeholder={tForm("password.label")}
          register={register}
          error={errors.password?.message || serverState.errors?.password?.[0]}
        />
        <SubmitButton isLoading={isPending}>{t("action.login")}</SubmitButton>
        <div className="text-center text-sm">
          <Link
            href="/forget-password"
            className="text-primary hover:underline"
          >
            {t("action.forgotPassword")}
          </Link>
        </div>
        <div className="text-center text-sm">
          {t("message.noAccount")}{" "}
          <Link href="/register" className="text-primary hover:underline">
            {t("action.register")}
          </Link>
        </div>
      </form>
    </>
  )
}
