"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { CurrencyFormData } from "@/features/currencies/schemas/currency"
import { Currency } from "../interfaces/currency"

export async function addCurrencyAction(
  _: ActionState,
  data: CurrencyFormData
): Promise<ActionState> {
  try {
    await fetcher("/setting/currencies", {
      method: "POST",
      body: data,
    })

    logger.info("Currency added successfully", { data })
    revalidatePath("/currencies")

    return { status: "success", message: "currencyAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Currency add error", {
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

export async function updateCurrencyAction(
  _: ActionState,
  data: Partial<Currency>
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/setting/currencies/${id}`, {
      method: "PATCH",
      body,
    })

    logger.info("Currency updated successfully", { data })
    revalidatePath("/currencies")

    return { status: "success", message: "currencyUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Currency update error", {
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

export async function currencyStateAction(
  _: ActionState,
  data: { id: string; state: boolean }
): Promise<ActionState> {
  try {
    if (data.state) {
      await fetcher(`/setting/currencies/${data.id}/activate`, {
        method: "PATCH",
      })

      logger.info("Currency activated successfully", { data })
      revalidatePath("/currencies")

      return { status: "success", message: "currencyActivated" }
    }

    await fetcher(`/setting/currencies/${data.id}/deactivate`, {
      method: "PATCH",
    })

    logger.info("Currency deactivated successfully", { data })
    revalidatePath("/currencies")

    return { status: "success", message: "currencyDeactivated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Category activation/deactivation error", {
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
