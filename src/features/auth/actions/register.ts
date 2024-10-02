"use server"

import { z } from "zod"

import logger from "@/lib/logger"
import { RegisterResponse } from "@/features/auth/interfaces/register"
import { redirect } from "@/config/navigation"
import { ApiError, fetcher } from "@/lib/api/fetcher"

// Note: This schema should match the client-side schema
const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["repeatPassword"],
  })

export type RegisterActionState = {
  errors?: {
    email?: string[]
    password?: string[]
    password_confirmation?: string[]
  }
  message?: string | null
}

export async function registerAction(
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check your entries.",
    }
  }

  const { email, password, password_confirmation } = validatedFields.data

  try {
    await fetcher<RegisterResponse>("/users/signup", {
      method: "POST",
      body: { email, password, password_confirmation },
    })
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Register error", {
        error: error.message,
        statusCode: error.statusCode,
        email,
      })

      switch (error.statusCode) {
        case 409:
          return {
            message: "emailAlreadyExists",
          }
        default:
          return { message: "default" }
      }
    }

    logger.error("Unexpected register error", { error, email })
    return { message: "An unexpected error occurred. Please try again later." }
  }

  logger.info("User registered successfully", { email })
  // Redirect to dashboard or home page after successful login
  return redirect("/login")
}
