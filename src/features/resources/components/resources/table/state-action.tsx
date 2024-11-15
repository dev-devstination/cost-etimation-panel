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
    // const updatedChildren = resource.children?.map((child) => ({
    //   child_resource_id: child.id,
    //   factor: child.factor,
    //   qty: child.qty,
    // }))
    // const updatedPrices = resource.prices.map((price) => ({
    //   basic_rate: price.basic_rate,
    //   factor: price.factor,
    //   currency_id: price.currency.id,
    // }))
    // const updatedResource = {
    //   id: resource.id,
    //   active: state,
    //   category_id: resource.category.id,
    //   children: updatedChildren,
    //   code: resource.code,
    //   description: resource.description,
    //   master: resource.master,
    //   output: resource.output,
    //   prices: updatedPrices,
    //   remark: resource.remarks,
    //   sub_category_id: resource.sub_category.id,
    //   unit_id: resource.unit.id,
    // }
    startTransition(() => {
      formAction({ id: resource.id, active: state })
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
