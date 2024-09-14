"use client"
import { useTranslations } from "next-intl"
import { FileText, Home, Settings } from "lucide-react"

import { DashboardLogo } from "@/components/Logo"
import { NavigationLink } from "@/components/navigation-link"

const Sidebar: React.FC = () => {
  const t = useTranslations("layout")

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-5">
        <DashboardLogo />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <NavigationLink href="/" icon={Home} label={t("home")} />
          <NavigationLink
            href="/resources"
            icon={FileText}
            label={t("resources")}
          />
          <NavigationLink
            href="/settings"
            icon={Settings}
            label={t("settings")}
          />
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
