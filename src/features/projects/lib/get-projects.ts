import { fetcherSSR } from "@/lib/api/fetcher"
import { Project } from "@/features/projects/interfaces/project"

export const getProjects = async () => {
  const { data: projects } = await fetcherSSR<Project[]>("/projects")

  const projectsOptions = projects.map((project) => ({
    label: project.name,
    value: project.id,
  }))

  return { projectsOptions, projects }
}
