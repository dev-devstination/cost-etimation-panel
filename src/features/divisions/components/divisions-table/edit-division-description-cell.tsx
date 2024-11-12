"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"
import { FormField, Form } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { DivisionRow } from "@/features/divisions/components/divisions-table/columns"
import { useDivisionDescriptionSchema } from "@/features/divisions/schemas/division"
import { DivisionDescriptionFormData } from "@/features/divisions/schemas/division"
import { updateDivisionAction } from "@/features/divisions/actions/division"

interface EditDivisionDescriptionCellProps {
  division: DivisionRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditDivisionDescriptionCell: React.FC<
  EditDivisionDescriptionCellProps
> = ({ division }) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const divisionDescriptionSchema = useDivisionDescriptionSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateDivisionAction,
    initialState
  )

  const form = useForm<DivisionDescriptionFormData>({
    resolver: zodResolver(divisionDescriptionSchema),
    defaultValues: {
      description: division.description,
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

  const onSubmit = (data: DivisionDescriptionFormData) => {
    startTransition(() => {
      formAction({ ...data, id: division.id })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="description"
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
