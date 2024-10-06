"use client"
import { useTranslations } from "next-intl"

import { DashboardLogo } from "@/components/Logo"
import { NavigationLink } from "@/components/navigation-link"
import { NavigationLink as INavigationLink } from "@/types"

interface SidebarProps {
  navLinks: INavigationLink[]
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  const t = useTranslations("layout.navlinks")

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-5">
        <DashboardLogo />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navLinks.map(({ url, label, icon }) => (
            <NavigationLink key={url} href={url} label={t(label)} icon={icon} />
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
