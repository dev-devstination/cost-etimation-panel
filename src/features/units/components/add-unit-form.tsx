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
import { UnitFormData, useUnitSchema } from "@/features/units/schemas/unit"
import { addUnitAction } from "@/features/units/actions/unit"

const initialState = {
  message: undefined,
  status: undefined,
}

export const AddUnitForm = () => {
  const t = useTranslations("UnitsPage.form")

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const unitSchema = useUnitSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(addUnitAction, initialState)

  const form = useForm<UnitFormData>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      closeButtonRef.current?.click()
    }
  }, [serverState])

  const onSubmit = (data: UnitFormData) => {
    startTransition(() => {
      formAction(data)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              label={t("name.label")}
              placeholder={t("name.placeholder")}
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Input
              label={t("description.label")}
              placeholder={t("description.placeholder")}
              {...field}
            />
          )}
        />

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