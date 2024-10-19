import { useTranslations } from "next-intl"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Project } from "@/features/projects/interfaces/project"
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog"
import { ProjectsList } from "@/features/projects/components/projects-list"

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
      <CardContent>
        <Tabs defaultValue={currentProject ? "current" : "list"}>
          <TabsList>
            <TabsTrigger value="current" disabled={!currentProject}>
              {t("current")}
            </TabsTrigger>
            <TabsTrigger value="list">{t("projectsList.title")}</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            {currentProject ? null : ( // /> //   isCurrent={true} //   project={currentProject} // <ProjectDetails
              <p>{t("noCurrentProject")}</p>
            )}
          </TabsContent>
          <TabsContent value="list">
            <ProjectsList projects={otherProjects} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
