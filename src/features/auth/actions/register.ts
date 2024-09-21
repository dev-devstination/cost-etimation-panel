"use server"

import { z } from "zod"

import { redirect } from "@/config/navigation"

// Note: This schema should match the client-side schema
const registerSchema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
  })

export type RegisterActionState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    password?: string[]
    repeatPassword?: string[]
  }
  message?: string | null
}

export async function registerAction(
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const validatedFields = registerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid input. Please check your entries.",
    }
  }

  const { email, password, firstName, lastName, repeatPassword } =
    validatedFields.data

  try {
    // Here you would typically handle the authentication logic
    // For example, calling an API or checking against a database
    console.log(
      "Register attempt:",
      email,
      password,
      firstName,
      lastName,
      repeatPassword
    )

    // Simulate successful login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Set a cookie or token upon successful login
    // cookies().set('auth_token', 'dummy_token', {
    //   httpOnly: true,
    //   secure: true,
    // });
  } catch (error) {
    return {
      message: "Register failed. Please check your credentials and try again.",
    }
  }

  // Redirect to dashboard or home page after successful login
  return redirect("/login")
}
