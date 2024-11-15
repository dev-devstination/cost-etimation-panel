"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { DivisionFormData } from "@/features/divisions/schemas/division"

export async function updateDivisionAction(
  _: ActionState,
  data: Partial<DivisionFormData> & { id: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/divisions/${id}`, {
      method: "PATCH",
      body,
    })

    logger.info("Division updated successfully", { data })
    revalidatePath("/divisions")

    return { status: "success", message: "divisionUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Division update error", {
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

export async function addDivisionAction(
  _: ActionState,
  data: DivisionFormData
): Promise<ActionState> {
  try {
    await fetcher("/divisions", {
      method: "POST",
      body: data,
    })

    logger.info("Division added successfully", { data })
    revalidatePath("/divisions")

    return { status: "success", message: "divisionAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Division add error", {
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
