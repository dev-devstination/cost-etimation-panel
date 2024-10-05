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
import Sidebar from "@/components/sidebar"
import LanguageSwitcher from "@/components/language-switcher"
import { NavbarBreadcrumb } from "@/components/navbar-breadcrumb"
import { UserProfile } from "@/components/user-profile"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations("layout")

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar for large screens */}
      <aside className="hidden w-48 border-r bg-card text-card-foreground lg:block">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-card p-4 text-card-foreground">
          <div className="flex items-center space-x-4">
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
                <Sidebar />
              </SheetContent>
            </Sheet>

            <NavbarBreadcrumb />
          </div>

          {/* Right side navbar items */}
          <div className="flex items-center space-x-4">
            <ToggleThemeButton />
            <LanguageSwitcher />
            <UserProfile />
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
