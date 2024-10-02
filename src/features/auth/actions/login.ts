"use server"

import { cookies } from "next/headers"
import { z } from "zod"

import { redirect } from "@/config/navigation"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { COOKIES } from "@/constants"
import logger from "@/lib/logger"
import { LoginResponse } from "../interfaces/login"

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
    const { data } = await fetcher<LoginResponse>("/users/signin", {
      method: "POST",
      body: { email, password },
    })

    cookies().set(COOKIES.AUTH_TOKEN, data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Register error", {
        error: error.message,
        statusCode: error.statusCode,
        email,
      })

      switch (error.statusCode) {
        case 401:
          return { message: "invalidCredentials" }
        default:
          return { message: "default" }
      }
    }
  }

  logger.info("User logged in successfully", { email })
  // Redirect to dashboard or home page after successful login
  return redirect("/")
}
