"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useToast } from "@/hooks/use-toast"
import { FormField, Form } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { Subcategory } from "@/features/activities/interfaces/subcategory"
import {
  SubcategoryNameFormData,
  useSubcategoryNameSchema,
} from "@/features/activities/schemas/subcategory"
import { updateSubcategoryAction } from "@/features/activities/actions/subcategory"
import { SubcategoriesRow } from "@/features/activities/components/subcategories/subcategories-table/columns"

interface EditSubcategoryNameCellProps {
  subcategory: SubcategoriesRow
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditSubcategoryNameCell: React.FC<
  EditSubcategoryNameCellProps
> = ({ subcategory }) => {
  const { toast } = useToast()
  const t = useTranslations("ActivitiesSubcategoriesPage.form")
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const subcategoryNameSchema = useSubcategoryNameSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateSubcategoryAction,
    initialState
  )

  const form = useForm<SubcategoryNameFormData>({
    resolver: zodResolver(subcategoryNameSchema),
    defaultValues: {
      name: subcategory.name,
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

  const onSubmit = (data: SubcategoryNameFormData) => {
    startTransition(() => {
      formAction({ ...data, id: subcategory.id })
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
              placeholder={t("name.placeholder")}
              disabled={isPending}
              {...field}
            />
          )}
        />
      </form>
    </Form>
  )
}
