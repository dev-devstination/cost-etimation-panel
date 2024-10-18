"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Currency } from "@/features/currencies/interfaces/currency"
import {
  CurrencyCurrencyFormData,
  useCurrencyCurrencySchema,
} from "@/features/currencies/schemas/currency"
import { updateCurrencyAction } from "@/features/currencies/actions/currency"
import { useToast } from "@/hooks/use-toast"
import { FormField, Form } from "@/components/ui/form"
import { Input } from "@/components/form/input"

interface EditCurrencyCellProps {
  currency: Currency
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditCurrencyCell: React.FC<EditCurrencyCellProps> = ({
  currency,
}) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const currencyCodeSchema = useCurrencyCurrencySchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateCurrencyAction,
    initialState
  )

  const form = useForm<CurrencyCurrencyFormData>({
    resolver: zodResolver(currencyCodeSchema),
    defaultValues: {
      currency: currency.currency,
    },
  })

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

  const onSubmit = (data: CurrencyCurrencyFormData) => {
    startTransition(() => {
      formAction({ ...data, id: currency.id })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <Input
              className="max-w-xs cursor-pointer border-0 focus:hover:cursor-text"
              disabled={isPending}
              {...field}
            />
          )}
        />
      </form>
    </Form>
  )
}
