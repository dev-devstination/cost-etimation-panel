"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import {
  SubcategoryNameFormData,
  SubcategoryFormData,
  SubcategoryCategoryFormData,
} from "@/features/activities/schemas/subcategory"

export async function updateSubcategoryAction(
  _: ActionState,
  data: (SubcategoryNameFormData | SubcategoryCategoryFormData) & { id: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/activities/subcategories/${id}`, {
      method: "PATCH",
      body,
    })

    logger.info("Subcategory updated successfully", { data })
    revalidatePath("/activities/subcategories")

    return { status: "success", message: "subcategoryUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Subcategory update error", {
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

export async function addSubcategoryAction(
  _: ActionState,
  data: SubcategoryFormData
): Promise<ActionState> {
  try {
    await fetcher("/activities/subcategories", {
      method: "POST",
      body: data,
    })

    logger.info("Subcategory added successfully", { data })
    revalidatePath("/activities/subcategories")

    return { status: "success", message: "subcategoryAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Subcategory add error", {
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

export async function subcategoryStateAction(
  _: ActionState,
  data: { id: string; state: boolean }
): Promise<ActionState> {
  try {
    if (data.state) {
      await fetcher(`/activities/subcategories/${data.id}/activate`, {
        method: "PATCH",
      })

      logger.info("Subcategory activated successfully", { data })
      revalidatePath("/activities/subcategories")

      return { status: "success", message: "subcategoryActivated" }
    }

    await fetcher(`/activities/subcategories/${data.id}/deactivate`, {
      method: "PATCH",
    })

    logger.info("Subcategory deactivated successfully", { data })
    revalidatePath("/activities/subcategories")

    return { status: "success", message: "subcategoryDeactivated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Subcategory activation/deactivation error", {
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
