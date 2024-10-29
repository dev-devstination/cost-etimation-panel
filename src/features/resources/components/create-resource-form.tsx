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
import { Currency } from "@/features/currencies/interfaces/currency"

import { createResourceAction } from "../actions/resource"
import { ResourceCompositionInput } from "./resource-composition-input"
import { Resource } from "../types"
import { generateSelectOptions } from "@/lib/utils"

interface CreateResourceFormProps {
  resources: Resource[]
  categories: SelectOption[]
  subcategories: (SelectOption & { category_id: string })[]
  currencies: Currency[]
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

  const {
    basic_rate,
    factor,
    currency_id,
    category_id,
    resource_compositions,
  } = form.watch()

  const totalCost =
    resource_compositions?.reduce((total, comp) => {
      const resource = resources.find(({ id }) => id === comp.child_resource_id)
      if (!resource) return total
      const rate = resource.basic_rate * resource.factor
      return total + Number(comp.qty) * rate
    }, 0) || 0

  useEffect(() => {}, [])
  const exchange_rate =
    currencies.find(({ id }) => id === currency_id)?.exchange_rate || 1

  const onSubmit = (data: ResourceFormData) => {
    startTransition(() => {
      formAction(data)
    })
  }

  const subcategoryOptions = subcategories.filter(
    (subcategory) => subcategory.category_id === category_id
  )

  const handleBasicRateChange = (value: string) => {
    if (!totalCost) return

    const newOutput = totalCost / (Number(value) || 1)
    if (!isNaN(newOutput) && isFinite(newOutput)) {
      form.setValue("output", newOutput.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  const handleOutputChange = (value: string) => {
    if (!totalCost) return

    const newBasicRate = totalCost / (Number(value) || 1)
    if (!isNaN(newBasicRate) && isFinite(newBasicRate)) {
      form.setValue("basic_rate", newBasicRate.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

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
                  disabled={!subcategoryOptions.length}
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
              <div className="col-span-12 lg:col-span-2">
                <Input
                  label={t("basic_rate.label")}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleBasicRateChange(e.target.value)
                  }}
                />
              </div>
            )}
          />

          {/* Currency */}
          <FormField
            control={form.control}
            name="currency_id"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-2">
                <Select
                  label={t("currency_id.label")}
                  placeholder={t("currency_id.placeholder")}
                  options={generateSelectOptions(currencies, {
                    label: "currency",
                    value: "id",
                  })}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />

          {/* Currency Exchange Rate */}
          <div className="col-span-12 lg:col-span-2">
            <Input
              label={t("exchange_rate.label")}
              disabled
              value={exchange_rate}
            />
          </div>

          {/* factor */}
          <FormField
            control={form.control}
            name="factor"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-2">
                <Input label={t("factor.label")} {...field} />
              </div>
            )}
          />

          {/* Rate */}
          <div className="col-span-12 lg:col-span-2">
            <Input
              label={t("rate.label")}
              disabled
              value={Number(basic_rate || 0) * Number(factor || 1)}
            />
          </div>

          {/* output */}
          <FormField
            control={form.control}
            name="output"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-2">
                <Input
                  label={t("output.label")}
                  {...field}
                  disabled={!resource_compositions?.length}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleOutputChange(e.target.value)
                  }}
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

        <div className="col-span-12">
          <ResourceCompositionInput
            resources={resources}
            categories={categories}
            subcategories={subcategories}
          />
        </div>

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
