import {
  Building,
  FileText,
  Home,
  List,
  Lock,
  Settings,
  User,
  Users,
} from "lucide-react"

import { NavigationLink } from "@/types"

export const COOKIES = {
  AUTH_TOKEN: "authToken",
}

export const MAIN_NAVLINKS: NavigationLink[] = [
  { url: "/", label: "home", icon: Home },
  { url: "/resources", label: "resources", icon: FileText },
  { url: "/activities/categories", label: "settings", icon: Settings },
]

export const ACCOUNT_NAVLINKS: NavigationLink[] = [
  { url: "/account", label: "accountInformation", icon: User },
  { url: "/company", label: "companyInformation", icon: Building },
  { url: "/members", label: "members", icon: Users },
  { url: "/billing", label: "billingPlans", icon: FileText },
  { url: "/security", label: "security", icon: Lock },
]

export const SETTINGS_NAVLINKS: NavigationLink[] = [
  { url: "/activities/categories", label: "activityCategories", icon: List },
]
