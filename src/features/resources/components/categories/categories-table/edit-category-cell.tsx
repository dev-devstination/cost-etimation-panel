"use client"

import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Category } from "@/types"
import {
  CategoryFormData,
  useCategorySchema,
} from "@/features/resources/schemas/category"
import { updateCategoryAction } from "@/features/resources/actions/category"
import { useToast } from "@/hooks/use-toast"
import { FormField, Form } from "@/components/ui/form"
import { Input } from "@/components/form/input"

interface EditCategoryCellProps {
  category: Category
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const EditCategoryCell: React.FC<EditCategoryCellProps> = ({
  category,
}) => {
  const { toast } = useToast()
  const t = useTranslations("ResourcesCategoriesPage.form")
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const categorySchema = useCategorySchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateCategoryAction,
    initialState
  )

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
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

  const onSubmit = (data: CategoryFormData) => {
    startTransition(() => {
      formAction({ ...data, id: category.id })
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
