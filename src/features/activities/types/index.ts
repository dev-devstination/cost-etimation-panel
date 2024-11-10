import { Resource } from "@/features/resources/types"
import { Unit } from "@/features/units/interfaces/unit"
import { Category, Subcategory } from "@/types"

export interface Children {
  activity_id: string
  amount: number
  child_resource: Resource
  child_resource_id: string
  id: string
  qty: number
}

export interface Activity {
  unit: Unit
  sub_category: Subcategory
  remarks: string
  rate: number
  output: number
  master: boolean
  id: string
  description: string
  cost: number
  company_id: string
  code: string
  children: Children[]
  category: Category
  active: boolean
}

export interface ActivityFilters {
  isMaster: boolean
}
