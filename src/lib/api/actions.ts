"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

import { redirect } from "@/config/navigation"
import { COOKIES } from "@/constants"

import { fetcher } from "./fetcher"

type ActionOptions = {
  revalidatePaths?: string[]
}

async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies()
  return cookieStore.get(COOKIES.AUTH_TOKEN)?.value || null
}

export async function serverAction(
  url: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body: Record<string, string> | null,
  options: ActionOptions = {}
) {
  const token = await getAuthToken()

  if (!token) {
    redirect("/login")
  }

  try {
    const result = await fetcher(url, {
      method,
      body,
      headers: { Authorization: `Bearer ${token}` },
    })

    if (options.revalidatePaths) {
      options.revalidatePaths.forEach((path) => {
        revalidatePath(path)
      })
    }

    return { success: true, data: result }
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/login")
    }

    console.error("Server action error:", error)
    return { success: false, error: "An error occurred" }
  }
}
