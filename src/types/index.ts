import { LucideIcon } from "lucide-react"

export interface LocalizedPageProps {
  params: { locale: string }
}

export interface NavigationLink {
  icon: LucideIcon
  label: keyof IntlMessages["layout"]["navlinks"]
  url: string
}

export type ActionState = {
  status?: "destructive" | "success"
  message?: keyof IntlMessages["apiErrors"] | keyof IntlMessages["apiSuccess"]
}
