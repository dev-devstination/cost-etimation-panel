"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { UnitFormData } from "@/features/units/schemas/unit"
import { Unit } from "@/features/units/interfaces/unit"

export async function addUnitAction(
  _: ActionState,
  data: UnitFormData
): Promise<ActionState> {
  try {
    await fetcher("/setting/units", {
      method: "POST",
      body: data,
    })

    logger.info("Unit added successfully", { data })
    revalidatePath("/units")

    return { status: "success", message: "unitAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Unit add error", {
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

export async function updateUnitAction(
  _: ActionState,
  data: Partial<Unit>
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/setting/units/${id}`, {
      method: "PATCH",
      body,
    })

    logger.info("Unit updated successfully", { data })
    revalidatePath("/units")

    return { status: "success", message: "unitUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Unit update error", {
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

export async function unitStateAction(
  _: ActionState,
  data: { id: string; state: boolean }
): Promise<ActionState> {
  try {
    if (data.state) {
      await fetcher(`/setting/units/${data.id}/activate`, {
        method: "PATCH",
      })

      logger.info("Unit activated successfully", { data })
      revalidatePath("/units")

      return { status: "success", message: "unitActivated" }
    }

    await fetcher(`/setting/units/${data.id}/deactivate`, {
      method: "PATCH",
    })

    logger.info("Currency deactivated successfully", { data })
    revalidatePath("/currencies")

    return { status: "success", message: "unitDeactivated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Unit activation/deactivation error", {
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
