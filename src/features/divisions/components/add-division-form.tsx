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
  useDivisionSchema,
  DivisionFormData,
} from "@/features/divisions/schemas/division"
import { addDivisionAction } from "@/features/divisions/actions/division"
import { Project } from "@/features/projects/interfaces/project"
import { SelectOption } from "@/types"
import { Select } from "@/components/form/select"

const initialState = {
  message: undefined,
  status: undefined,
}

interface AddDivsionFormProps {
  projectsOptions: SelectOption[]
  currentProject?: Project
}

export const AddDivisionForm = ({
  projectsOptions,
  currentProject,
}: AddDivsionFormProps) => {
  const t = useTranslations("DivisionsPage.form")

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const divisionSchema = useDivisionSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    addDivisionAction,
    initialState
  )

  const form = useForm<DivisionFormData>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      number: "",
      description: "",
      project_id: currentProject?.id,
    },
  })

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      closeButtonRef.current?.click()
    }
  }, [serverState])

  const onSubmit = (data: DivisionFormData) => {
    startTransition(() => {
      formAction(data)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-3">
                <Input
                  label={t("number.label")}
                  placeholder={t("number.placeholder")}
                  {...field}
                />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="project_id"
            render={({ field }) => (
              <div className="col-span-12 lg:col-span-9">
                <Select
                  label={t("project_id.label")}
                  placeholder={t("project_id.placeholder")}
                  options={projectsOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </div>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Input
              label={t("description.label")}
              placeholder={t("description.placeholder")}
              {...field}
            />
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
