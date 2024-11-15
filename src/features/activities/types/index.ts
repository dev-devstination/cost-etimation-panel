import { Resource } from "@/features/resources/types"
import { Unit } from "@/features/units/interfaces/unit"
import { Category, Subcategory } from "@/types"

export interface Children {
  activity_id: string
  id: string
  amount: number
  qty: number
  resource: Resource
  resource_id: string
}

export interface Activity {
  active: boolean
  category: Category
  children: Children[]
  code: string
  company_id: string
  cost: number
  description: string
  id: string
  master: boolean
  output: number
  rate: number
  remarks: string
  sub_category: Subcategory
  unit: Unit
}

export interface ActivityFilters {
  isMaster: boolean
}
