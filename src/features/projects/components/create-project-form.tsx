"use client"

import { useEffect, useRef, useTransition } from "react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  ProjectFormData,
  useProjectSchema,
} from "@/features/projects/schemas/project"
import { projectAction } from "@/features/projects/actions/project"
import { useToast } from "@/hooks/use-toast"
import { Form, FormField } from "@/components/ui/form"
import { SubmitMessage } from "@/components/form/submit-message"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/form/input"
import { Select } from "@/components/form/select"
import { Category } from "@/types"
import { DatePicker } from "@/components/form/date-picker"
import { Project } from "@/features/projects/interfaces/project"

const initialState = {
  status: undefined,
  message: undefined,
}

interface CreateProjectFormProps {
  categories: Category[]
  project?: Project
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  categories,
  project,
}) => {
  const t = useTranslations("ProjectsPage.form")
  const tSuccess = useTranslations("apiSuccess")
  const { toast } = useToast()

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const projectSchema = useProjectSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(projectAction, initialState)

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      area: project?.area || "",
      client_name: project?.client_name || "",
      consultant_name: project?.consultant_name || "",
      category_id: project?.category.id,
      queries_dead_line_date: project?.queries_dead_line_date,
      release_date: project?.release_date,
      site_visit_date: project?.site_visit_date,
      submission_date: project?.submission_date,
    },
  })

  useEffect(() => {
    const { status } = serverState

    if (status === "success") {
      closeButtonRef.current?.click()
      toast({
        variant: "success",
        description: tSuccess("projectCreated"),
      })
    }
  }, [serverState, tSuccess, toast])

  const onSubmit = (data: ProjectFormData) => {
    startTransition(() => {
      formAction({ ...data, id: project?.id })
    })
  }

  const categoriesOptions = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">{t("basicInfo")}</h3>
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input
                  label={t("name.label")}
                  placeholder={t("name.placeholder")}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="consultant_name"
              render={({ field }) => (
                <Input
                  label={t("consultant_name.label")}
                  placeholder={t("consultant_name.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <Input
                  label={t("area.label")}
                  placeholder={t("area.placeholder")}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <Input
                  label={t("client_name.label")}
                  placeholder={t("client_name.placeholder")}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <Select
                  label={t("category_id.label")}
                  placeholder={t("category_id.placeholder")}
                  options={categoriesOptions}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">{t("dates")}</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="queries_dead_line_date"
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  label={t("queries_dead_line_date.label")}
                  placeholder={t("queries_dead_line_date.placeholder")}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <FormField
              control={form.control}
              name="release_date"
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  label={t("release_date.label")}
                  placeholder={t("release_date.placeholder")}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="site_visit_date"
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  label={t("site_visit_date.label")}
                  placeholder={t("site_visit_date.placeholder")}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <FormField
              control={form.control}
              name="submission_date"
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  label={t("submission_date.label")}
                  placeholder={t("submission_date.placeholder")}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>

          <SubmitButton className="w-auto" isLoading={isPending}>
            {project ? t("update") : t("create")}
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  )
}
