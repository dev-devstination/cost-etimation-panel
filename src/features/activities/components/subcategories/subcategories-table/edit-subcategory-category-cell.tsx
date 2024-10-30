"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"

import { useToast } from "@/hooks/use-toast"
import { SubcategoriesRow } from "@/features/activities/components/subcategories/subcategories-table/columns"
import { updateSubcategoryAction } from "@/features/activities/actions/subcategory"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface EditSubcategoryCategoryCellProps {
  subcategory: SubcategoriesRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditSubcategoryCategoryCell: React.FC<
  EditSubcategoryCategoryCellProps
> = ({ subcategory }) => {
  const { toast } = useToast()
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateSubcategoryAction,
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

  const onChange = (category_id: string) => {
    startTransition(() => {
      formAction({ category_id, id: subcategory.id })
    })
  }

  return (
    <Select
      disabled={isPending}
      onValueChange={onChange}
      defaultValue={subcategory.category.id}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {subcategory.categories.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
