"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { resourceStateAction } from "@/features/resources/actions/resource"
import { Resource } from "@/features/resources/types"

interface ActionsProps {
  resource: Resource
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const StateAction: React.FC<ActionsProps> = ({ resource }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    resourceStateAction,
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

  const handleResourceState = (state: boolean) => {
    const children = resource.children?.map((child) => ({
      child_resource_id: child.id,
      factor: child.factor,
      qty: child.qty,
    }))

    const prices = resource.prices.map((price) => ({
      basic_rate: price.basic_rate,
      factor: price.factor,
      currency_id: price.currency.id,
    }))

    startTransition(() => {
      formAction({
        id: resource.id,
        active: state,
        prices,
        children,
      })
    })
  }

  return (
    <Switch
      defaultChecked={resource.active}
      disabled={isPending}
      onCheckedChange={handleResourceState}
    />
  )
}
