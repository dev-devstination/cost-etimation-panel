"use client"

import { useEffect, useRef, useTransition } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { UserPlus2 } from "lucide-react"

import { SubmitButton } from "@/components/submit-button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SubmitMessage } from "@/components/form/submit-message"
import {
  CurrencyInputFormData,
  useCurrencySchema,
} from "@/features/currencies/schemas/currency"
import { addCurrencyAction } from "../actions/currency"

const initialState = {
  message: undefined,
  status: undefined,
}

export const AddCurrencyForm = () => {
  const t = useTranslations("CurrenciesPage.form")

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const currencySchema = useCurrencySchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    addCurrencyAction,
    initialState
  )

  const form = useForm<CurrencyInputFormData>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      code: "",
      country: "",
      currency: "",
      exchange_rate: "",
    },
  })

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      closeButtonRef.current?.click()
    }
  }, [serverState])

  const onSubmit = (data: CurrencyInputFormData) => {
    const values = {
      ...data,
      exchange_rate: parseFloat(parseFloat(data.exchange_rate).toFixed(2)),
    }

    startTransition(() => {
      formAction(values)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("currencyInformation")}</h3>

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <Input
                  label={t("code.label")}
                  placeholder={t("code.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <Input
                  label={t("currency.label")}
                  placeholder={t("currency.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <Input
                  label={t("country.label")}
                  placeholder={t("country.placeholder")}
                  {...field}
                />
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">{t("exchangeRates")}</h3>

            <FormField
              control={form.control}
              name="exchange_rate"
              render={({ field }) => (
                <Input
                  label={t("exchange_rate.label")}
                  placeholder={t("exchange_rate.placeholder")}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>

          <SubmitButton className="w-auto" isLoading={isPending}>
            <UserPlus2 className="size-4 ltr:mr-2 rtl:ml-2" />
            {t("save")}
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  )
}
