import { useTranslations } from "next-intl"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Project } from "@/features/projects/interfaces/project"
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog"

interface ProjectsOverviewProps {
  currentProject?: Project
  otherProjects: Project[]
}

export const ProjectsOverview = ({
  currentProject,
  otherProjects,
}: ProjectsOverviewProps) => {
  const t = useTranslations("ProjectsPage")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("overview")}</CardTitle>
        <CreateProjectDialog />
      </CardHeader>
    </Card>
  )
}
