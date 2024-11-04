"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Unit } from "@/features/units/interfaces/unit"
import { unitStateAction } from "@/features/units/actions/unit"

interface ActionsProps {
  unit: Unit
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const Actions: React.FC<ActionsProps> = ({ unit }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(unitStateAction, initialState)

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

  const handleCategoryState = (state: boolean) => {
    startTransition(() => {
      formAction({ id: unit.id, state })
    })
  }

  return (
    <Switch
      defaultChecked={unit.active}
      disabled={isPending}
      onCheckedChange={handleCategoryState}
    />
  )
}
