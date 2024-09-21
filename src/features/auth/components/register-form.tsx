"use client"

import { useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Link } from "@/config/navigation"
import {
  RegisterFormData,
  useRegisterSchema,
} from "@/features/auth/schemas/register"
import { AuthInput } from "@/features/auth/components/auth-input"
import { registerAction } from "@/features/auth/actions/register"
import { SubmitButton } from "@/components/submit-button"

const initialState = {
  errors: {},
  message: null,
}

export const RegisterForm: React.FC = () => {
  const t = useTranslations("auth")
  const tForm = useTranslations("auth.form")
  const registerSchema = useRegisterSchema()

  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(registerAction, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
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
        {t("signUpTitle")}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AuthInput
            name="firstName"
            type="text"
            placeholder={tForm("firstName.label")}
            register={register}
            error={
              errors.firstName?.message || serverState.errors?.firstName?.[0]
            }
          />
          <AuthInput
            name="lastName"
            type="text"
            placeholder={tForm("lastName.label")}
            register={register}
            error={
              errors.lastName?.message || serverState.errors?.lastName?.[0]
            }
          />
        </div>
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
        <AuthInput
          name="repeatPassword"
          type="password"
          placeholder={tForm("repeatPassword.label")}
          register={register}
          error={
            errors.repeatPassword?.message ||
            serverState.errors?.repeatPassword?.[0]
          }
        />
        <div className="mt-6">
          <SubmitButton isLoading={isPending} className="w-full">
            {t("action.register")}
          </SubmitButton>
        </div>

        <div className="mt-4 text-center text-sm">
          {t("message.haveAccount")}{" "}
          <Link href="/login" className="text-primary hover:underline">
            {t("action.login")}
          </Link>
        </div>
      </form>
    </>
  )
}
