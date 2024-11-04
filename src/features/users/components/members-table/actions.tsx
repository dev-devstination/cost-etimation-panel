"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { MemberRow } from "@/features/users/components/members-table/columns"
import { memberActivationAction } from "@/features/users/actions/member"
import { useToast } from "@/hooks/use-toast"

interface ActionsProps {
  member: MemberRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const Actions: React.FC<ActionsProps> = ({ member }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(
    memberActivationAction,
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

  const handleMemberState = (state: boolean) => {
    startTransition(() => {
      formAction({ id: member.id, active: state })
    })
  }

  if (member.id === member.currentUserId) {
    return null
  }

  return (
    <Switch
      defaultChecked={member.active}
      disabled={isPending}
      onCheckedChange={handleMemberState}
    />
  )
}
