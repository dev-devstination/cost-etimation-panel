"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Currency } from "@/features/currencies/interfaces/currency"
import { currencyStateAction } from "@/features/currencies/actions/currency"

interface ActionsProps {
  currency: Currency
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const Actions: React.FC<ActionsProps> = ({ currency }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(
    currencyStateAction,
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

  const handleCategoryState = (state: boolean) => {
    startTransition(() => {
      formAction({ id: currency.id, state })
    })
  }

  return (
    <Switch
      defaultChecked={currency.active}
      disabled={isPending}
      onCheckedChange={handleCategoryState}
    />
  )
}
