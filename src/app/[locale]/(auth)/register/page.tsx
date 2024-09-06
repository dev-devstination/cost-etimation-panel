import { Metadata } from "next"

import { RegisterForm } from "@/features/auth/components/register-form"

export const metadata: Metadata = {
  title: "Register Account",
  description: "Register a new account",
}

export default function RegisterPage() {
  return <RegisterForm />
}
