import { useTranslations } from "next-intl"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Project } from "@/features/projects/interfaces/project"
import { ProjectsList } from "@/features/projects/components/projects-list"
import { ProjectDetails } from "./project-details"

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
    <Tabs defaultValue={currentProject ? "current" : "list"}>
      <TabsList>
        <TabsTrigger value="current" disabled={!currentProject}>
          {t("current")}
        </TabsTrigger>
        <TabsTrigger value="list">{t("projectsList.title")}</TabsTrigger>
      </TabsList>
      <TabsContent value="current">
        <ProjectDetails project={currentProject} />
      </TabsContent>
      <TabsContent value="list">
        <ProjectsList projects={otherProjects} />
      </TabsContent>
    </Tabs>
  )
}
