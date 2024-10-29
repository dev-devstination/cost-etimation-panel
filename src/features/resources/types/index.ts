import { Currency } from "@/features/currencies/interfaces/currency"
import { Unit } from "@/features/units/interfaces/unit"
import { Category, Subcategory } from "@/types"

export interface ResourceComposition {
  amount: number
  child_resource_id: string
  id: string
  qty: number
  resource_id: string
}

export interface Resource {
  id: string
  code: string
  description: string
  remarks: string
  category: Category
  sub_category: Subcategory
  company: string
  unit: Unit
  currency: Currency
  basic_rate: number
  output: number
  factor: number
  rate: number
  cost: number
  master: boolean
  active: boolean
  resource_compositions?: ResourceComposition[]
}
