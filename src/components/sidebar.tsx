"use client"
import { useTranslations } from "next-intl"

// import { DashboardLogo } from "./logo"
import { NavigationLink } from "./navigation-link"
import { NavigationLink as INavigationLink } from "@/types"

interface SidebarProps {
  navLinks: INavigationLink
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  const t = useTranslations("layout.navlinks")

  return (
    <div className="flex h-full flex-col">
      <div className="h-16 border-b p-5">{/* <DashboardLogo /> */}</div>
      <nav className="flex-1 p-4">
        {Object.entries(navLinks).map(([title, links]) => (
          <div key={title} className="mb-4">
            {title !== "default" && (
              <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
                {t(title as keyof IntlMessages["layout"]["navlinks"])}
              </h3>
            )}
            <ul className="space-y-2">
              {links.map(({ url, label, icon }) => (
                <NavigationLink
                  key={url}
                  href={url}
                  label={t(label)}
                  icon={icon}
                />
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
