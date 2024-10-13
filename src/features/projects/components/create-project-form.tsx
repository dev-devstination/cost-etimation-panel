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
import { createProjectAction } from "@/features/projects/actions/project"
import { useToast } from "@/hooks/use-toast"
import { Form, FormField } from "@/components/ui/form"
import { SubmitMessage } from "@/components/form/submit-message"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/form/input"

const initialState = {
  status: undefined,
  message: undefined,
}

export const CreateProjectForm = () => {
  const t = useTranslations("ProjectsPage.form")
  const tSuccess = useTranslations("apiSuccess")
  const { toast } = useToast()

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const projectSchema = useProjectSchema()
  const [isPending, startTransition] = useTransition()

  const [serverState, formAction] = useFormState(
    createProjectAction,
    initialState
  )

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
    },
  })

  useEffect(() => {
    console.log("use effect run")
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

        <SubmitMessage
          status={serverState.status}
          message={serverState.message}
        />

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">{t("cancel")}</Button>
          </DialogClose>

          <SubmitButton className="w-auto" isLoading={isPending}>
            {t("save")}
          </SubmitButton>
        </DialogFooter>
      </form>
    </Form>
  )
}
