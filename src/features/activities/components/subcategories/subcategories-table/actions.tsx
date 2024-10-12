"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Subcategory } from "@/features/activities/interfaces/subcategory"
import { subcategoryStateAction } from "@/features/activities/actions/subcategory"

interface ActionsProps {
  subcategory: Subcategory
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const Actions: React.FC<ActionsProps> = ({ subcategory }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(
    subcategoryStateAction,
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

  const handleSubcategoryState = (state: boolean) => {
    startTransition(() => {
      formAction({ id: subcategory.id, state })
    })
  }

  return (
    <Switch
      defaultChecked={subcategory.active}
      disabled={isPending}
      onCheckedChange={handleSubcategoryState}
    />
  )
}
