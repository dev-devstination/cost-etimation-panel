"use server"
import { cookies } from "next/headers"

import { COOKIES } from "@/constants"
import { redirect } from "@/config/navigation"

export async function logoutAction() {
  cookies().delete(COOKIES.AUTH_TOKEN)
  redirect("/login")
}
