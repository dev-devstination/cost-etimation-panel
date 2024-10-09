import { Building, FileText, Home, Lock, User, Users } from "lucide-react"

import { NavigationLink } from "@/types"

export const COOKIES = {
  AUTH_TOKEN: "authToken",
}

export const MAIN_NAVLINKS: NavigationLink[] = [
  { url: "/", label: "home", icon: Home },
  { url: "/resources", label: "resources", icon: FileText },
]

export const ACCOUNT_NAVLINKS: NavigationLink[] = [
  { url: "/account", label: "accountInformation", icon: User },
  { url: "/company", label: "companyInformation", icon: Building },
  { url: "/members", label: "members", icon: Users },
  { url: "/billing", label: "billingPlans", icon: FileText },
  { url: "/security", label: "security", icon: Lock },
]
