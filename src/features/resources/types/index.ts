import { Currency } from "@/features/currencies/interfaces/currency"
import { Unit } from "@/features/units/interfaces/unit"
import { User } from "@/features/users/interfaces/user"
import { Category, Subcategory } from "@/types"

export interface Resource {
  id: string
  active: boolean
  basic_rate: number
  factor: number
  category: Category
  children?: ResourceComposition[]
  code: string
  company_id: string
  cost: number
  created_at: number
  description: string
  master: boolean
  output: number
  prices: ResourcePrice[]
  rate: number
  remarks: string
  sub_category: Subcategory
  unit: Unit
  updated_at: number
}

export interface ResourceFilters {
  resourceType?: string
  isComposite: boolean
  isMaster: boolean
}

export interface ResourcePrice {
  id: string
  basic_rate: number
  created_at: number
  currency: Currency
  currency_id: string
  resource_id: string
  updated_at: number
  user: User
  user_id: string
  factor: number
}

export interface ResourceComposition {
  id: string
  amount: number
  child_id: string
  company_id: string
  factor: number
  qty: number
  resource: Resource
  resource_id: string
  created_at: number
  updated_at: number
}
