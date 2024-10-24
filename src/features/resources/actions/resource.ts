"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"

import { ResourceFormData } from "../schemas/resource"

export async function updateResourceAction(
  _: ActionState,
  data: ResourceFormData & { id: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/resources/${id}`, {
      method: "PATCH",
      body,
    })

    logger.info("Resource updated successfully", { data })
    revalidatePath(`/resources/${id}`)

    return { status: "success", message: "resourceUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Resource update error", {
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

export async function createResourceAction(
  _: ActionState,
  data: ResourceFormData
): Promise<ActionState> {
  try {
    await fetcher("/resources", {
      method: "POST",
      body: data,
    })

    logger.info("Resource added successfully", { data })
    revalidatePath("/resources")

    return { status: "success", message: "resourceAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Resource add error", {
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
