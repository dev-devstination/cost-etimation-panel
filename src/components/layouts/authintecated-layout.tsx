import { useTranslations } from "next-intl"
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ToggleThemeButton } from "@/components/ToggleThemeButton"
import { NavbarBreadcrumb } from "@/components/navbar-breadcrumb"
import { UserProfile } from "@/components/user-profile"
import { DashboardLogo } from "@/components/logo"
import { ProjectSelector } from "@/features/projects/components/project-switcher"
import LanguageSwitcher from "@/components/language-switcher"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
  sidebar,
}) => {
  const t = useTranslations("layout")

  return (
    <div className="flex min-h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar for large screens */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card text-card-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex-1 overflow-y-auto">{sidebar}</div>

        <div className="p-4">
          <ProjectSelector />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <header className="fixed inset-x-0 top-0 z-10 flex h-16 items-center justify-between border-b bg-card p-4 text-card-foreground">
          <div className="flex items-center gap-x-4">
            {/* Sheet component for mobile sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label={t("toggleSidebar")}
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader>
                  <SheetTitle className="sr-only">
                    {t("mobileNavigation")}
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    {t("mobileNavigationDescription")}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex h-full flex-col justify-between">
                  <div>{sidebar}</div>

                  <div className="p-4">
                    <ProjectSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <DashboardLogo />
            {/* <div className="hidden lg:flex lg:ltr:ml-44 lg:rtl:mr-44">
              <NavbarBreadcrumb />
            </div> */}
          </div>

          {/* Right side navbar items */}
          <div className="flex items-center space-x-4">
            <ToggleThemeButton />
            <LanguageSwitcher />
            <UserProfile />
          </div>
        </header>

        {/* Page content */}
        <main
          id="main-content"
          className="mt-16 flex-1 overflow-auto p-6 lg:ltr:ml-64 lg:rtl:mr-64"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
