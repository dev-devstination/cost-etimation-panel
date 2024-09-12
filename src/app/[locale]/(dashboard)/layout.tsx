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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations("layout")

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:block w-48 bg-card text-card-foreground border-r">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="bg-card text-card-foreground border-b p-4 flex justify-between items-center sticky top-0 z-10">
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
                  <Menu className="h-6 w-6" />
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
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
