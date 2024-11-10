"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Activity } from "@/features/activities/types"
import { activityStateAction } from "@/features/activities/actions/activity"

interface StateActionProps {
  activity: Activity
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const StateAction: React.FC<StateActionProps> = ({ activity }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(
    activityStateAction,
    initialState
  )

  useEffect(() => {
    const { status, message } = serverState

    if (message) {
      toast({
        variant: status,
        description:
          status === "success"
            ? tSuccess(message as keyof IntlMessages["apiSuccess"])
            : tError(message as keyof IntlMessages["apiErrors"]),
      })
    }
  }, [serverState, tError, tSuccess, toast])

  const handleActivityState = (state: boolean) => {
    startTransition(() => {
      formAction({ id: activity.id, active: state })
    })
  }

  return (
    <Switch
      defaultChecked={activity.active}
      disabled={isPending}
      onCheckedChange={handleActivityState}
    />
  )
}
