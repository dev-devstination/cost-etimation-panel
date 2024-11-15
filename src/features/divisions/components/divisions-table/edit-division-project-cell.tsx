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
import { DivisionRow } from "@/features/divisions/components/divisions-table/columns"
import { updateDivisionAction } from "@/features/divisions/actions/division"

interface EditDivisionProjectCellProps {
  division: DivisionRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditDivisionProjectCell: React.FC<
  EditDivisionProjectCellProps
> = ({ division }) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateDivisionAction,
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

  const onChange = (project_id: string) => {
    startTransition(() => {
      formAction({ project_id, id: division.id })
    })
  }

  return (
    <Select
      disabled={isPending}
      onValueChange={onChange}
      defaultValue={division.project_id}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {division.projects.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
