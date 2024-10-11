"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { CategoryFormData } from "@/features/activities/schemas/category"

export async function updateCategoryAction(
  _: ActionState,
  data: CategoryFormData & { id: string }
): Promise<ActionState> {
  try {
    await fetcher(`/activities/categories/${data.id}`, {
      method: "PATCH",
      body: data,
    })

    logger.info("Category updated successfully", { data })
    revalidatePath("/activities/categories")

    return { status: "success", message: "categoryUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Category update error", {
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

export async function addCategoryAction(
  _: ActionState,
  data: CategoryFormData
): Promise<ActionState> {
  try {
    await fetcher("/activities/categories", {
      method: "POST",
      body: data,
    })

    logger.info("Category added successfully", { data })
    revalidatePath("/activities/categories")

    return { status: "success", message: "categoryAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Category add error", {
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

export async function categoryStateAction(
  _: ActionState,
  data: { id: string; state: boolean }
): Promise<ActionState> {
  try {
    if (data.state) {
      await fetcher(`/activities/categories/${data.id}/activate`, {
        method: "PATCH",
      })

      logger.info("Category activated successfully", { data })
      revalidatePath("/activities/categories")

      return { status: "success", message: "categoryActivated" }
    }

    await fetcher(`/activities/categories/${data.id}/deactivate`, {
      method: "PATCH",
    })

    logger.info("Category deactivated successfully", { data })
    revalidatePath("/activities/categories")

    return { status: "success", message: "categoryDeactivated" }
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
