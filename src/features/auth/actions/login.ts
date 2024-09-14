"use server"

import { cookies } from "next/headers"
import { z } from "zod"

import { redirect } from "@/config/navigation"

// Note: This schema should match the client-side schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginActionState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

export async function loginAction(
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check your entries.",
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Here you would typically handle the authentication logic
    // For example, calling an API or checking against a database
    console.log("Login attempt:", email, password)

    // Simulate successful login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Set a cookie or token upon successful login
    cookies().set("auth_token", "dummy_token", {
      httpOnly: true,
      secure: true,
    })
  } catch (error) {
    return {
      message: "Login failed. Please check your credentials and try again.",
    }
  }

  // Redirect to dashboard or home page after successful login
  return redirect("/dashboard")
}
