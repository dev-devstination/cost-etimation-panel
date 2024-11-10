"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { ActivityFormData, UpdateActivitiesSchema } from "../schemas/activity"

export async function activityAction(
  _: ActionState,
  data: ActivityFormData & { id?: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    if (id) {
      await fetcher(`/activities/${id}`, {
        method: "PATCH",
        body,
      })

      logger.info("Activity updated successfully", { data })
      revalidatePath(`/activities/${id}`)

      return { status: "success", message: "activityUpdated" }
    }

    await fetcher("/activities", {
      method: "POST",
      body: data,
    })

    logger.info("Activity added successfully", { data })
    revalidatePath("/activities")

    return { status: "success", message: "activityAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Activity add error", {
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

export async function updateActivitiesAction(
  _: ActionState,
  data: UpdateActivitiesSchema
): Promise<ActionState> {
  const { activities } = data
  try {
    await fetcher(`/activities`, {
      method: "PATCH",
      body: activities,
    })

    logger.info("Activities updated successfully", { data })
    revalidatePath(`/activities`)

    return { status: "success", message: "activitiesUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Activities update error", {
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

export async function activityStateAction(
  _: ActionState,
  data: { id: string; active: boolean }
): Promise<ActionState> {
  try {
    await fetcher(`/activities/${data.id}`, {
      method: "PATCH",
      body: { active: data.active },
    })

    logger.info("Activity activated successfully", { data })
    revalidatePath("/activities")

    return { status: "success", message: "activityUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Activity activation/deactivation error", {
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
