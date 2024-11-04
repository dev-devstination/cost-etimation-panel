"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { CompanyFormData } from "@/features/users/schemas/company"
import { ActionState } from "@/types"

export async function companyAction(
  _: ActionState,
  data: CompanyFormData
): Promise<ActionState> {
  try {
    await fetcher("/companies/update", {
      method: "POST",
      body: data,
    })

    logger.info("Company updated successfully", { data })
    revalidatePath("/company")

    return { status: "success", message: "companyUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Company update error", {
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
