"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import { ActionState } from "@/types"
import { ProjectFormData } from "@/features/projects/schemas/project"
import { COOKIES } from "@/constants"

export async function projectAction(
  _: ActionState,
  data: ProjectFormData & { id?: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    if (id) {
      await fetcher(`/projects/${id}`, {
        method: "PATCH",
        body,
      })

      logger.info("Project updated successfully", { data })
    } else {
      await fetcher("/projects", {
        method: "POST",
        body: data,
      })

      logger.info("Project added successfully", { data })
    }

    revalidatePath("/projects")

    return {
      status: "success",
      message: id ? "projectUpdated" : "projectCreated",
    }
  } catch (error) {
    if (error instanceof ApiError) {
      if (id) {
        logger.error("Project update error", {
          error: error.message,
          statusCode: error.statusCode,
          body: data,
        })
      } else {
        logger.error("Project create error", {
          error: error.message,
          statusCode: error.statusCode,
          body: data,
        })
      }

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

export async function projectStateAction(
  _: ActionState,
  data: { id: string; state: boolean }
): Promise<ActionState> {
  try {
    if (data.state) {
      await fetcher(`/projects/${data.id}/activate`, {
        method: "PATCH",
      })

      logger.info("Project activated successfully", { data })
      revalidatePath("/projects")

      return { status: "success", message: "projectActivated" }
    }

    await fetcher(`/projects/${data.id}/deactivate`, {
      method: "PATCH",
    })

    logger.info("Project deactivated successfully", { data })
    revalidatePath("/projects")

    return { status: "success", message: "projectDeactivated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Project activation/deactivation error", {
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

export async function changeCurrentProjectAction(projectId: string) {
  const cookieStore = cookies()

  cookieStore.set(COOKIES.CURRENT_PROJECT_ID, projectId)

  revalidatePath("/")
}
