import { useTranslations } from "next-intl"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateProjectForm } from "@/features/projects/components/create-project-form"
import { ProjectRowProps } from "@/features/projects/components/projects-table/columns"

interface EditProjectDialogProps {
  project: ProjectRowProps
}

export const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  project,
}) => {
  const t = useTranslations("ProjectsPage.dialog")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("edit")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <CreateProjectForm categories={project.categories} project={project} />
      </DialogContent>
    </Dialog>
  )
}
