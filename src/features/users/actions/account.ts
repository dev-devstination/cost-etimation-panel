"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { AccountFormData } from "@/features/users/schemas/account"
import { ActionState } from "@/types"

export async function accountAction(
  _: ActionState,
  data: AccountFormData
): Promise<ActionState> {
  try {
    await fetcher("/users/update", {
      method: "POST",
      body: data,
    })

    logger.info("User updated account successfully", { data })
    revalidatePath("/account")

    return { status: "success", message: "accountUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Account update error", {
        error: error.message,
        statusCode: error.statusCode,
        body: data,
      })

      switch (error.statusCode) {
        default:
          return { status: "destructive", message: "default" }
      }
    }

    return {
      message: "default",
      status: "destructive",
    }
  }
}
