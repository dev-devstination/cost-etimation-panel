"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { MemberFormData } from "@/features/users/schemas/member"
import { ActionState } from "@/types"

export async function addMemberAction(
  _: ActionState,
  data: MemberFormData
): Promise<ActionState> {
  try {
    await fetcher("/companies/members/add", {
      method: "POST",
      body: data,
    })

    logger.info("Member added successfully", { data })
    revalidatePath("/members")

    return { status: "success", message: "memberAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Member add error", {
        error: error.message,
        statusCode: error.statusCode,
        body: data,
      })

      switch (error.statusCode) {
        case 409:
          return {
            status: "destructive",
            message: "emailAlreadyExists",
          }
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
