"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"

import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { BillsRow } from "@/features/bills/components/bills-table/columns"
import { updateBillAction } from "@/features/bills/actions/bill"

interface EditBillProjectCellProps {
  bill: BillsRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditBillProjectCell: React.FC<EditBillProjectCellProps> = ({
  bill,
}) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(updateBillAction, initialState)

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

  const onChange = (project_id: string) => {
    startTransition(() => {
      formAction({ project_id, id: bill.id })
    })
  }

  return (
    <Select
      disabled={isPending}
      onValueChange={onChange}
      defaultValue={bill.project_id}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {bill.projects.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
