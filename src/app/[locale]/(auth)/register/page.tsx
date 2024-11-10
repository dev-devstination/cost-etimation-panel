import { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { RegisterForm } from "@/features/auth/components/register-form"

export const metadata: Metadata = {
  title: "Register Account",
  description: "Register a new account",
}

export default function RegisterPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)

  return <RegisterForm />
}
