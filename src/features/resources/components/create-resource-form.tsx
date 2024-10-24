"use client"
import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"

import { useRouter } from "@/config/navigation"
import { SelectOption } from "@/types"
import {
  ResourceFormData,
  useResourceSchema,
} from "@/features/resources/schemas/resource"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { SubmitMessage } from "@/components/form/submit-message"
import { SubmitButton } from "@/components/submit-button"
import { Textarea } from "@/components/form/textarea"
import { Select } from "@/components/form/select"

import { createResourceAction } from "../actions/resource"

interface CreateResourceFormProps {
  resources: SelectOption[]
  categories: SelectOption[]
  subcategories: (SelectOption & { category_id: string })[]
  currencies: SelectOption[]
  units: SelectOption[]
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const CreateResourceForm = ({
  resources,
  categories,
  subcategories,
  currencies,
  units,
}: CreateResourceFormProps) => {
  const t = useTranslations("CreateResourcePage.form")
  const router = useRouter()
  console.log("resources", resources)
  const resourceSchema = useResourceSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    createResourceAction,
    initialState
  )

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      router.push("/resources")
    }
  }, [router, serverState])

  const form = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      basic_rate: "",
      code: "",
      description: "",
      factor: "",
      output: "",
      remarks: "",
    },
  })

  const onSubmit = (data: ResourceFormData) => {
    startTransition(() => {
      formAction(data)
    })
  }

  const [category_id, resource_compositions] = form.watch([
    "category_id",
    "resource_compositions",
  ])
  const subcategoryOptions = subcategories.filter(
    (subcategory) => subcategory.category_id === category_id
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-1">
                <Input label={t("code.label")} {...field} />
              </div>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-11">
                <Input label={t("description.label")} {...field} />
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Category */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-4">
                <Select
                  label={t("category_id.label")}
                  placeholder={t("category_id.placeholder")}
                  options={categories}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />

          {/* Subcategory */}
          <FormField
            control={form.control}
            name="sub_category_id"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-4">
                <Select
                  label={t("sub_category_id.label")}
                  options={subcategoryOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />

          {/* Unit */}
          <FormField
            control={form.control}
            name="unit_id"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-4">
                <Select
                  label={t("unit_id.label")}
                  options={units}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Basic Rate */}
          <FormField
            control={form.control}
            name="basic_rate"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input label={t("basic_rate.label")} {...field} />
              </div>
            )}
          />

          {/* Currency */}
          <FormField
            control={form.control}
            name="currency_id"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Select
                  label={t("currency_id.label")}
                  placeholder={t("currency_id.placeholder")}
                  options={currencies}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />

          {/* factor */}
          <FormField
            control={form.control}
            name="factor"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input label={t("factor.label")} {...field} />
              </div>
            )}
          />

          {/* output */}
          <FormField
            control={form.control}
            name="output"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input
                  label={t("output.label")}
                  {...field}
                  disabled={!resource_compositions?.length}
                />
              </div>
            )}
          />
        </div>

        {/* remarks */}
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <div className="col-span-12 lg:col-span-3">
              <Textarea label={t("remarks.label")} {...field} />
            </div>
          )}
        />

        {/* resource_compositions */}

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <SubmitButton className="w-auto" isLoading={isPending}>
          <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          {t("save")}
        </SubmitButton>
      </form>
    </Form>
  )
}
