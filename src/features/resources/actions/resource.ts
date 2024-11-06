"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"

import { ResourceFormData, UpdateResourcesSchema } from "../schemas/resource"

export async function resourceAction(
  _: ActionState,
  data: ResourceFormData & { id?: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    if (id) {
      await fetcher(`/resources/${id}`, {
        method: "PATCH",
        body,
      })

      logger.info("Resource updated successfully", { data })
      revalidatePath(`/resources/${id}`)

      return { status: "success", message: "resourceUpdated" }
    }

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

export async function updateResourcesAction(
  _: ActionState,
  data: UpdateResourcesSchema
): Promise<ActionState> {
  const { resources } = data
  try {
    await fetcher(`/resources`, {
      method: "PATCH",
      body: resources,
    })

    logger.info("Resource updated successfully", { data })
    revalidatePath(`/resources`)

    return { status: "success", message: "resourcesUpdated" }
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

export async function resourceStateAction(
  _: ActionState,
  data: { id: string; active: boolean }
): Promise<ActionState> {
  try {
    await fetcher(`/resources/${data.id}`, {
      method: "PATCH",
      body: { active: data.active },
    })

    logger.info("Resource activated successfully", { data })
    revalidatePath("/resources")

    return { status: "success", message: "resourceUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Resource activation/deactivation error", {
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
