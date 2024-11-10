import { Category } from "@/types"

export interface Project {
  id: string
  name: string
  client_name: string
  category: Category
  area: string
  consultant_name: string
  release_date: number
  submission_date: number
  site_visit_date: number
  queries_dead_line_date: number
  active: boolean
  submitted: boolean
}
