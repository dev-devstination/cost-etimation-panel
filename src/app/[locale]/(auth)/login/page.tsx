import { unstable_setRequestLocale } from "next-intl/server"

import { LoginForm } from "@/features/auth/components/login-form"
import { LocalizedPageProps } from "@/types"

export default function LoginPage({ params: { locale } }: LocalizedPageProps) {
  unstable_setRequestLocale(locale)

  return <LoginForm />
}
