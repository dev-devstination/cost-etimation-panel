import React from "react"
import { useTranslations } from "next-intl"
import { FileText, Home, Settings } from "lucide-react"

import { Link } from "@/config/navigation"
import { DashboardLogo } from "@/components/Logo"

const SidebarLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<any>
  label: string
}) => (
  <li>
    <Link
      href={href}
      className="flex items-center p-2 rounded-lg hover:bg-primary/10 transition-colors"
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{label}</span>
    </Link>
  </li>
)

const Sidebar: React.FC = () => {
  const t = useTranslations("layout")

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b">
        <DashboardLogo />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarLink href="/dashboard" icon={Home} label={t("home")} />
          <SidebarLink
            href="/resources"
            icon={FileText}
            label={t("resources")}
          />
          <SidebarLink href="/settings" icon={Settings} label={t("settings")} />
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
