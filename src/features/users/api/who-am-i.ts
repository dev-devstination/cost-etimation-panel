import { cookies } from "next/headers"

import { COOKIES } from "@/constants"
import { User } from "@/features/users/interfaces/user"

export const whoAmI = async () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  const token = cookies().get(COOKIES.AUTH_TOKEN)?.value

  const response = await fetch(`${API_BASE_URL}/users/whoami`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const { data } = (await response.json()) as { data: User }
  return data
}
