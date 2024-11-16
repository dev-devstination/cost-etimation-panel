"use client"

import { useTransition, useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"

import { DataTable } from "@/components/data-table"
import { Form } from "@/components/ui/form"
import { SubmitButton } from "@/components/submit-button"
import { useToast } from "@/hooks/use-toast"
import { SelectOption } from "@/types"

import { columns } from "@/features/activities/components/activities/table/columns"
import { Popover } from "@/features/activities/components/activities/table/popover"
import { Activity, ActivityFilters } from "@/features/activities/types"
import { updateActivitiesAction } from "@/features/activities/actions/activity"
import {
  UpdateActivitiesSchema,
  updateActivitiesSchema,
} from "@/features/activities/schemas/activity"
import { Filters } from "@/features/activities/components/activities/filters"

interface UpdateActivitiesTableProps {
  activities: Activity[]
  categoriesOptions: SelectOption[]
  subcategoriesOptions: (SelectOption & { category_id: string })[]
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const UpdateActivitiesTable: React.FC<UpdateActivitiesTableProps> = ({
  activities,
  categoriesOptions,
  subcategoriesOptions,
}) => {
  const [searchValue, setSearchValue] = useState("")
  const [filters, setFilters] = useState<ActivityFilters>({
    isMaster: false,
  })

  const t = useTranslations("ResourcesPage.table")
  const tApi = useTranslations("apiSuccess")
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateActivitiesAction,
    initialState
  )

  useEffect(() => {
    const { status, message } = serverState

    if (status === "success") {
      toast({
        title: tApi(message as keyof IntlMessages["apiSuccess"]),
      })
    }
  }, [serverState, tApi, toast])

  const form = useForm<UpdateActivitiesSchema>({
    resolver: zodResolver(updateActivitiesSchema),
    defaultValues: {
      activities: activities.map((activity) => ({
        id: activity.id,
        output: activity.output.toString(),
        children: activity.children.map((child) => ({
          resource_id: child.resource.id,
          qty: child.qty.toString(),
        })),
      })),
    },
  })

  const onSubmit = (data: UpdateActivitiesSchema) => {
    startTransition(() => {
      formAction(data)
    })
  }

  const filteredActivities = activities.filter((activity: Activity) => {
    // Text search
    if (
      searchValue &&
      !activity.description.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return false
    }

    // Master filter
    if (filters.isMaster && !activity.master) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-4">
      <Filters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filters}
        onFilterChange={setFilters}
        categoriesOptions={categoriesOptions}
        subcategoriesOptions={subcategoriesOptions}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DataTable
            columns={columns}
            data={filteredActivities}
            PopoverContent={Popover}
          />
          {form.formState.isDirty && (
            <SubmitButton
              isLoading={form.formState.isSubmitting || isPending}
              className="min-w-48"
              disabled={isPending}
            >
              {t("save")}
            </SubmitButton>
          )}
        </form>
      </Form>
    </div>
  )
}
