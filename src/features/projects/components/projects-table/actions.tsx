"use client"

import { useEffect, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useFormState } from "react-dom"

import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { projectStateAction } from "@/features/projects/actions/project"
import { EditProjectDialog } from "@/features/projects/components/projects-table/edit-project-dialog"
import { ProjectRowProps } from "@/features/projects/components/projects-table/columns"

interface ActionsProps {
  project: ProjectRowProps
}

const initialState = {
  message: undefined,
  status: undefined,
}

export const Actions: React.FC<ActionsProps> = ({ project }) => {
  const tSuccess = useTranslations("apiSuccess")
  const tError = useTranslations("apiErrors")

  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [serverState, formAction] = useFormState(
    projectStateAction,
    initialState
  )

  useEffect(() => {
    const { status, message } = serverState

    if (message) {
      toast({
        variant: status,
        description:
          status === "success"
            ? tSuccess(message as keyof IntlMessages["apiSuccess"])
            : tError(message as keyof IntlMessages["apiErrors"]),
      })
    }
  }, [serverState, tError, tSuccess, toast])

  const handleCategoryState = (state: boolean) => {
    startTransition(() => {
      formAction({ id: project.id, state })
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        defaultChecked={project.active}
        disabled={isPending}
        onCheckedChange={handleCategoryState}
      />
      <EditProjectDialog project={project} />
    </div>
  )
}
