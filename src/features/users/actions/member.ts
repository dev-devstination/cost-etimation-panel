"use server"
import { revalidatePath } from "next/cache"

import logger from "@/lib/logger"
import { ApiError, fetcher } from "@/lib/api/fetcher"
import {
  MemberFormData,
  MemberRoleFormData,
} from "@/features/users/schemas/member"
import { ActionState } from "@/types"

export async function addMemberAction(
  _: ActionState,
  data: MemberFormData
): Promise<ActionState> {
  try {
    await fetcher("/companies/members/add", {
      method: "POST",
      body: data,
    })

    logger.info("Member added successfully", { data })
    revalidatePath("/members")

    return { status: "success", message: "memberAdded" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Member add error", {
        error: error.message,
        statusCode: error.statusCode,
        body: data,
      })

      switch (error.statusCode) {
        case 409:
          return {
            status: "destructive",
            message: "emailAlreadyExists",
          }
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

export async function updateMemberAction(
  _: ActionState,
  data: MemberRoleFormData & { id: string }
): Promise<ActionState> {
  const { id, ...body } = data
  try {
    await fetcher(`/companies/members/${id}/role`, {
      method: "PATCH",
      body,
    })

    logger.info("Member updated successfully", { data })
    revalidatePath("/members")

    return { status: "success", message: "memberUpdated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Member update error", {
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

export async function memberActivationAction(
  _: ActionState,
  data: { id: string; active: boolean }
): Promise<ActionState> {
  try {
    if (data.active) {
      await fetcher(`/companies/members/${data.id}/activate`, {
        method: "PATCH",
      })

      logger.info("Member activated successfully", { data })
      revalidatePath("/members")

      return { status: "success", message: "memberActivated" }
    }

    await fetcher(`/companies/members/${data.id}/deactivate`, {
      method: "PATCH",
    })

    logger.info("Member deactivated successfully", { data })
    revalidatePath("/members")

    return { status: "success", message: "memberDeactivated" }
  } catch (error) {
    if (error instanceof ApiError) {
      logger.error("Member activation/deactivation error", {
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
