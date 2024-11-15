"use client"
import { useEffect, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit, Plus } from "lucide-react"

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

import { resourceAction } from "@/features/resources/actions/resource"
import { ResourceCompositionInput } from "@/features/resources/components/resources/resource-composition-input"
import { Resource } from "@/features/resources/types"
import { Switch } from "@/components/form/switch"

interface CreateResourceFormProps {
  resource?: Resource
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

export const ResourceForm = ({
  resource,
  resources,
  categories,
  subcategories,
  currencies,
  units,
}: CreateResourceFormProps) => {
  const t = useTranslations("ResourcePage.form")
  const router = useRouter()

  const resourceSchema = useResourceSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(resourceAction, initialState)

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      router.push("/resources")
    }
  }, [router, serverState])

  const defaultResourceChildren = resource?.children?.map((child) => ({
    child_resource_id: child.resource.id,
    qty: child.qty.toString(),
    factor: child.factor.toString(),
  }))

  const defaultResourcePrices = resource?.prices
    ?.sort((a, b) => {
      // Sort by updated_at in descending order
      const dateA = new Date(a.updated_at).getTime()
      const dateB = new Date(b.updated_at).getTime()
      return dateB - dateA
    })
    .map((price) => ({
      basic_rate: price.basic_rate.toString(),
      factor: price.factor.toString(),
      currency_id: price.currency.id,
    }))

  const form = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      prices: defaultResourcePrices || [
        { basic_rate: "", factor: "1", currency_id: currencies[0].id },
      ],
      code: resource?.code || "",
      description: resource?.description || "",
      output: resource?.output?.toString() || "",
      remarks: resource?.remarks || "",
      category_id: resource?.category?.id,
      sub_category_id: resource?.sub_category?.id,
      unit_id: resource?.unit?.id,
      children: defaultResourceChildren,
      master: resource?.master,
    },
  })

  const { prices, category_id, children, output, master } = form.watch()
  const priceInput = prices[0]
  const disabled = resource && master

  const totalAmounts =
    children?.reduce((total, child) => {
      const resource = resources.find(
        ({ id }) => id === child.child_resource_id
      )
      if (!resource) return total

      const rate = resource.basic_rate * resource.factor
      return total + Number(child.qty) * rate * Number(child.factor)
    }, 0) || 0

  const onSubmit = (data: ResourceFormData) => {
    startTransition(() => {
      formAction({ ...data, id: resource?.id })
    })
  }

  const subcategoryOptions = subcategories.filter(
    (subcategory) => subcategory.category_id === category_id
  )

  const getResourceRate = () => {
    const { basic_rate, factor } = priceInput
    const initialRate = Number(basic_rate) * Number(factor)
    if (!totalAmounts) {
      return initialRate
    }

    const cost = totalAmounts / (Number(output) || 1)

    return (cost + Number(priceInput.basic_rate)) * Number(priceInput.factor)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 relative"
      >
        {/* Master */}
        <div className="absolute -top-14 ltr:right-0 rtl:left-0">
          <FormField
            control={form.control}
            name="master"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-1">
                <Switch
                  label={t("master.label")}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-1">
                <Input label={t("code.label")} {...field} disabled={disabled} />
              </div>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-11">
                <Input
                  label={t("description.label")}
                  {...field}
                  disabled={disabled}
                />
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
                  disabled={disabled}
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
                  disabled={!subcategoryOptions.length || disabled}
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
                  disabled={disabled}
                />
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Basic Rate */}
          <FormField
            control={form.control}
            name={`prices.${0}.basic_rate`}
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input label={t("basic_rate.label")} {...field} />
              </div>
            )}
          />

          {/* factor */}
          <FormField
            control={form.control}
            name={`prices.${0}.factor`}
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input label={t("factor.label")} {...field} />
              </div>
            )}
          />

          {/* Rate */}
          <div className="col-span-12 lg:col-span-3">
            <Input label={t("rate.label")} disabled value={getResourceRate()} />
          </div>

          {/* output */}
          <FormField
            control={form.control}
            name="output"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input
                  label={t("output.label")}
                  {...field}
                  disabled={!children?.length}
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
            <div className="col-span-12">
              <Textarea
                label={t("remarks.label")}
                {...field}
                disabled={disabled}
              />
            </div>
          )}
        />

        <div className="col-span-12">
          <ResourceCompositionInput
            disabled={disabled}
            resourceCompositions={defaultResourceChildren}
            resources={resources.filter((r) => r.id !== resource?.id)}
            categories={categories}
            subcategories={subcategories}
          />
        </div>

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <SubmitButton className="w-auto" isLoading={isPending}>
          {resource ? (
            <Edit className="size-4 ltr:mr-2 rtl:ml-2" />
          ) : (
            <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          )}
          {resource ? t("update") : t("save")}
        </SubmitButton>
      </form>
    </Form>
  )
}
