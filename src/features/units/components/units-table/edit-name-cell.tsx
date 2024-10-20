"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Unit } from "@/features/units/interfaces/unit"
import {
  UnitNameFormData,
  useUnitNameSchema,
} from "@/features/units/schemas/unit"
import { updateUnitAction } from "@/features/units/actions/unit"
import { useToast } from "@/hooks/use-toast"
import { FormField, Form } from "@/components/ui/form"
import { Input } from "@/components/form/input"

interface EditNameCellProps {
  unit: Unit
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditNameCell: React.FC<EditNameCellProps> = ({ unit }) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const unitNameSchema = useUnitNameSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(updateUnitAction, initialState)

  const form = useForm<UnitNameFormData>({
    resolver: zodResolver(unitNameSchema),
    defaultValues: {
      name: unit.name,
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

  const onSubmit = (data: UnitNameFormData) => {
    startTransition(() => {
      formAction({ ...data, id: unit.id })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
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
