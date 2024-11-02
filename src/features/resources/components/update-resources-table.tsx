"use client"

import { useTransition, useEffect } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"

import { DataTable } from "@/components/data-table"
import { Form } from "@/components/ui/form"
import { SubmitButton } from "@/components/submit-button"
import { useToast } from "@/hooks/use-toast"

import { columns } from "./columns"
import { Resource } from "../types"
import { Popover } from "./popover"
import {
  updateResourcesSchema,
  UpdateResourcesSchema,
} from "../schemas/resource"
import { updateResourcesAction } from "../actions/resource"

interface UpdateResourcesTableProps {
  resources: Resource[]
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const UpdateResourcesTable: React.FC<UpdateResourcesTableProps> = ({
  resources,
}) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DataTable
          columns={columns}
          data={resources}
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
  )
}
