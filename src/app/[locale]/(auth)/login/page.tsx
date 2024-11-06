import { setRequestLocale } from "next-intl/server"

import { LoginForm } from "@/features/auth/components/login-form"
import { LocalizedPageProps } from "@/types"

export default function LoginPage({ params: { locale } }: LocalizedPageProps) {
  setRequestLocale(locale)

  return <LoginForm />
}
