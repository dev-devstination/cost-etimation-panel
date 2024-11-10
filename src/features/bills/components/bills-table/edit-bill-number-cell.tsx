"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"
import { FormField, Form } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { BillsRow } from "@/features/bills/components/bills-table/columns"
import { useBillNumberSchema } from "@/features/bills/schemas/bill"
import { BillNumberFormData } from "@/features/bills/schemas/bill"
import { updateBillAction } from "@/features/bills/actions/bill"

interface EditBillNumberCellProps {
  bill: BillsRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditBillNumberCell: React.FC<EditBillNumberCellProps> = ({
  bill,
}) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const billNumberSchema = useBillNumberSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(updateBillAction, initialState)

  const form = useForm<BillNumberFormData>({
    resolver: zodResolver(billNumberSchema),
    defaultValues: {
      number: bill.number,
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

  const onSubmit = (data: BillNumberFormData) => {
    startTransition(() => {
      formAction({ ...data, id: bill.id })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="number"
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
