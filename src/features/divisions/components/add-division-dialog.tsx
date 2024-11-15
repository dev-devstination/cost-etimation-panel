import { Plus } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AddDivisionForm } from "@/features/divisions/components/add-division-form"
import { getProjects } from "@/features/projects/lib/get-projects"
import { getCurrentProject } from "@/features/projects/lib/get-current-project"

export const AddDivisionDialog = async () => {
  const t = await getTranslations("DivisionsPage.dialog")
  const { projectsOptions, projects } = await getProjects()
  const { currentProject } = getCurrentProject(projects)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4 ltr:mr-2 rtl:ml-2" />
          {t("add")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <AddDivisionForm
          projectsOptions={projectsOptions}
          currentProject={currentProject}
        />
      </DialogContent>
    </Dialog>
  )
}
