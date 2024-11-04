import { LucideIcon } from "lucide-react"

export interface LocalizedPageProps {
  params: { locale: "en" | "ar" }
}

export interface NavigationLink {
  [k: string]: {
    icon: LucideIcon
    label: keyof IntlMessages["layout"]["navlinks"]
    url: string
  }[]
}

export type ActionState = {
  status?: "destructive" | "success"
  message?: keyof IntlMessages["apiErrors"] | keyof IntlMessages["apiSuccess"]
}

export type SelectOption = {
  label: string
  value: string
}

export interface Category {
  id: string
  name: string
  active: boolean
}

export interface Subcategory {
  id: string
  name: string
  active: boolean
  category: Category
}
