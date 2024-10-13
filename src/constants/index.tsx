import {
  Building,
  FileText,
  Home,
  Lock,
  Settings,
  Tag,
  Tags,
  User,
  Users,
} from "lucide-react"

import { NavigationLink } from "@/types"

export const COOKIES = {
  AUTH_TOKEN: "authToken",
  CURRENT_PROJECT_ID: "currentProjectId",
}

export const MAIN_NAVLINKS: NavigationLink = {
  default: [
    { url: "/", label: "home", icon: Home },
    { url: "/resources", label: "resources", icon: FileText },
    { url: "/activities/categories", label: "settings", icon: Settings },
  ],
}

export const ACCOUNT_NAVLINKS: NavigationLink = {
  default: [
    { url: "/account", label: "accountInformation", icon: User },
    { url: "/company", label: "companyInformation", icon: Building },
    { url: "/members", label: "members", icon: Users },
    { url: "/billing", label: "billingPlans", icon: FileText },
    { url: "/security", label: "security", icon: Lock },
  ],
}

export const SETTINGS_NAVLINKS: NavigationLink = {
  projects: [
    {
      url: "/projects",
      label: "projects",
      icon: Building,
    },
    {
      url: "/projects/categories",
      label: "categories",
      icon: Tag,
    },
  ],
  activity: [
    {
      url: "/activities/categories",
      label: "categories",
      icon: Tag,
    },
    {
      url: "/activities/subcategories",
      label: "subcategories",
      icon: Tags,
    },
  ],
}
