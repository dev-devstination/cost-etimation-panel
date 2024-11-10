"use client"
import { useEffect, useState, useTransition } from "react"
import { useFormState } from "react-dom"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit, Plus } from "lucide-react"

import { useRouter } from "@/config/navigation"
import { SelectOption } from "@/types"
import { ActivityFormData } from "@/features/activities/schemas/activity"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { SubmitMessage } from "@/components/form/submit-message"
import { SubmitButton } from "@/components/submit-button"
import { Textarea } from "@/components/form/textarea"
import { Select } from "@/components/form/select"

import { Resource } from "@/features/resources/types"
import { Activity } from "@/features/activities/types"
import { useActivitySchema } from "@/features/activities/schemas/activity"
import { activityAction } from "@/features/activities/actions/activity"
import { ActivityCompositionInput } from "@/features/activities/components/activities/activity-composition-input"

interface CreateActivityFormProps {
  activity?: Activity
  resources: Resource[]
  activityCategoriesOptions: SelectOption[]
  activitySubcategoriesOptions: (SelectOption & { category_id: string })[]
  resourceCategoriesOptions: SelectOption[]
  resourceSubcategoriesOptions: (SelectOption & { category_id: string })[]
  unitsOptions: SelectOption[]
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const ActivityForm = ({
  activity,
  resources,
  activityCategoriesOptions,
  activitySubcategoriesOptions,
  resourceCategoriesOptions,
  resourceSubcategoriesOptions,
  unitsOptions,
}: CreateActivityFormProps) => {
  const t = useTranslations("ActivitiesPage.form")
  const [proposedRate, setProposedRate] = useState(activity?.rate || 0)
  const router = useRouter()

  const activitySchema = useActivitySchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(activityAction, initialState)

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      router.push("/activities")
    }
  }, [router, serverState])

  const defaultActivityCompositions = activity?.children?.map((comp) => ({
    child_resource_id: comp.child_resource.id,
    qty: comp.qty.toString(),
  }))

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      code: activity?.code || "",
      description: activity?.description || "",
      output: activity?.output?.toString() || "",
      remarks: activity?.remarks || "",
      category_id: activity?.category?.id,
      sub_category_id: activity?.sub_category?.id,
      unit_id: activity?.unit?.id,
      activity_compositions: defaultActivityCompositions,
    },
  })

  const { category_id, activity_compositions, output } = form.watch()

  const totalCost =
    activity_compositions?.reduce((total, comp) => {
      const resource = resources.find(({ id }) => id === comp.child_resource_id)
      if (!resource) return total
      const rate = resource.basic_rate * resource.factor
      return total + Number(comp.qty) * rate
    }, 0) || 0

  const onSubmit = (data: ActivityFormData) => {
    startTransition(() => {
      formAction({ ...data, id: activity?.id })
    })
  }

  const activitySubcategoryOptions = activitySubcategoriesOptions.filter(
    (subcategory) => subcategory.category_id === category_id
  )

  const handleProposedRateChange = (value: string) => {
    setProposedRate(Number(value))
    if (!totalCost) return

    const newOutput = totalCost / (Number(value) || 1)
    if (!isNaN(newOutput) && isFinite(newOutput)) {
      form.setValue("output", newOutput.toFixed(2), {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  const getActivityRate = () => {
    return totalCost / (Number(output) || 1)
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
                  options={activityCategoriesOptions}
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
                  disabled={!activitySubcategoryOptions.length}
                  label={t("sub_category_id.label")}
                  options={activitySubcategoryOptions}
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
                  options={unitsOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Proposed Rate */}

          <div className="col-span-12 lg:col-span-4">
            <Input
              label={t("proposed_rate.label")}
              value={proposedRate}
              onChange={(e) => handleProposedRateChange(e.target.value)}
            />
          </div>

          {/* Rate */}
          <div className="col-span-12 lg:col-span-4">
            <Input label={t("rate.label")} disabled value={getActivityRate()} />
          </div>

          {/* output */}
          <FormField
            control={form.control}
            name="output"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-4">
                <Input label={t("output.label")} {...field} />
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
          <ActivityCompositionInput
            activityCompositions={defaultActivityCompositions}
            resources={resources}
            categories={resourceCategoriesOptions}
            subcategories={resourceSubcategoriesOptions}
          />
        </div>

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <SubmitButton className="w-auto" isLoading={isPending}>
          {activity ? (
            <Edit className="size-4 ltr:mr-2 rtl:ml-2" />
          ) : (
            <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          )}
          {activity ? t("update") : t("save")}
        </SubmitButton>
      </form>
    </Form>
  )
}
