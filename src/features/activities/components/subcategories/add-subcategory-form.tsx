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
  SubcategoryFormData,
  useSubcategorySchema,
} from "@/features/activities/schemas/subcategory"
import { addSubcategoryAction } from "@/features/activities/actions/subcategory"
import { Select } from "@/components/form/select"
import { Category } from "@/features/activities/interfaces/category"

interface AddSubcategoryFormProps {
  categories: Category[]
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const AddSubcategoryForm: React.FC<AddSubcategoryFormProps> = ({
  categories,
}) => {
  const t = useTranslations("ActivitiesSubcategoriesPage.form")

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const subcategorySchema = useSubcategorySchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    addSubcategoryAction,
    initialState
  )

  const form = useForm<SubcategoryFormData>({
    resolver: zodResolver(subcategorySchema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      closeButtonRef.current?.click()
    }
  }, [serverState])

  const categoriesOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }))

  const onSubmit = (data: SubcategoryFormData) => {
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
            <div className="col-span-8">
              <Input
                label={t("name.label")}
                placeholder={t("name.placeholder")}
                {...field}
              />
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <div className="col-span-8">
              <Select
                label={t("category_id.label")}
                placeholder={t("category_id.placeholder")}
                options={categoriesOptions}
                onValueChange={field.onChange}
                defaultValue={field.value}
              />
            </div>
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
