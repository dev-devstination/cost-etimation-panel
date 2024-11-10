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

import { columns } from "@/features/resources/components/resources/table/columns"
import { Resource, ResourceFilters } from "@/features/resources/types"
import { Popover } from "@/features/resources/components/resources/table/popover"
import {
  updateResourcesSchema,
  UpdateResourcesSchema,
} from "@/features/resources/schemas/resource"
import { updateResourcesAction } from "@/features/resources/actions/resource"
import { Filters } from "../filters"

interface UpdateResourcesTableProps {
  resources: Resource[]
  categoriesOptions: SelectOption[]
  subcategoriesOptions: (SelectOption & { category_id: string })[]
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const UpdateResourcesTable: React.FC<UpdateResourcesTableProps> = ({
  resources,
  categoriesOptions,
  subcategoriesOptions,
}) => {
  const [searchValue, setSearchValue] = useState("")
  const [filters, setFilters] = useState<ResourceFilters>({
    resourceType: undefined,
    isComposite: false,
    isMaster: false,
  })

  const t = useTranslations("ResourcesPage.table")
  const tApi = useTranslations("apiSuccess")
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    updateResourcesAction,
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

  const form = useForm<UpdateResourcesSchema>({
    resolver: zodResolver(updateResourcesSchema),
    defaultValues: {
      resources: resources.map((resource) => ({
        id: resource.id,
        basic_rate: resource.basic_rate.toString(),
        factor: resource.factor.toString(),
      })),
    },
  })

  const onSubmit = (data: UpdateResourcesSchema) => {
    startTransition(() => {
      formAction(data)
    })
  }

  const filteredResources = resources.filter((resource: Resource) => {
    // Text search
    if (
      searchValue &&
      !resource.description.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      return false
    }

    // Composite filter
    if (filters.isComposite && !resource.children?.length) {
      return false
    }

    // Master filter
    if (filters.isMaster && !resource.master) {
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
            data={filteredResources}
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
