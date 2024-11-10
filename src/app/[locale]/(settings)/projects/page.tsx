import { getTranslations, setRequestLocale } from "next-intl/server"

import { LocalizedPageProps } from "@/types"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Project } from "@/features/projects/interfaces/project"
import { getCurrentProject } from "@/features/projects/lib/get-current-project"
import { ProjectsOverview } from "@/features/projects/components/project-overview"
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog"

export default async function ProjectsPage({
  params: { locale },
}: LocalizedPageProps) {
  setRequestLocale(locale)
  const t = await getTranslations("ProjectsPage")

  const { data: projects } = await fetcherSSR<Project[]>("/projects")
  const { currentProject, otherProjects } = getCurrentProject(projects)

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-6 text-3xl font-bold">{t("title")}</h1>

        <CreateProjectDialog />
      </div>

      <ProjectsOverview
        currentProject={currentProject}
        otherProjects={otherProjects}
      />
    </div>
  )
}
