import { cookies } from "next/headers"

import { Project } from "@/features/projects/interfaces/project"
import { COOKIES } from "@/constants"

export function getCurrentProject(projects: Project[]): {
  currentProject: Project | undefined
  otherProjects: Project[]
} {
  const currentProjectId = cookies().get(COOKIES.CURRENT_PROJECT_ID)?.value

  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  )
  const otherProjects = projects.filter(
    (project) => project.id !== currentProjectId
  )

  return { currentProject, otherProjects }
}
