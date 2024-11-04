import { DataTable } from "@/components/data-table"
import { Project } from "@/features/projects/interfaces/project"
import {
  columns,
  ProjectRowProps,
} from "@/features/projects/components/projects-table/columns"
import { fetcherSSR } from "@/lib/api/fetcher"
import { Category } from "@/types"

interface ProjectsListProps {
  projects: Project[]
}

export const ProjectsList: React.FC<ProjectsListProps> = async ({
  projects,
}) => {
  const { data: categories } = await fetcherSSR<Category[]>(
    "/projects/categories"
  )

  const data: ProjectRowProps[] = projects.map((project) => ({
    ...project,
    categories,
  }))

  return <DataTable columns={columns} data={data} />
}
