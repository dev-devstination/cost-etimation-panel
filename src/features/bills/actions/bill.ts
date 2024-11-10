"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { BillFormData } from "@/features/bills/schemas/bill"

export async function updateBillAction(
  _: ActionState,
  data: Partial<BillFormData> & { id: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/bills/${id}`, {
      method: "PATCH",
      body,
    })

    logger.info("Bill updated successfully", { data })
    revalidatePath("/bills")

    return { status: "success", message: "billUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Bill update error", {
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

export async function addBillAction(
  _: ActionState,
  data: BillFormData
): Promise<ActionState> {
  try {
    await fetcher("/bills", {
      method: "POST",
      body: data,
    })

    logger.info("Bill added successfully", { data })
    revalidatePath("/bills")

    return { status: "success", message: "billAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Bill add error", {
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
