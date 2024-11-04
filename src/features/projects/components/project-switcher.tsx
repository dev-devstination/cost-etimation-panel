import { getCurrentProject } from "@/features/projects/lib/get-current-project"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Project } from "@/features/projects/interfaces/project"
import { ProjectSelect } from "./project-select"

export const ProjectSelector = async () => {
  const { data: projects } = await fetcherSSR<Project[]>("/projects")

  const { currentProject } = getCurrentProject(projects)

  return <ProjectSelect projects={projects} currentProject={currentProject} />
}
