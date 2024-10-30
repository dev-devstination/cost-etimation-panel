"use client"
import { Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, usePathname } from "@/config/navigation"
import { useTranslations } from "next-intl"
import { Fragment } from "react"

const pathMap: Record<string, keyof IntlMessages["common"]["pages"]> = {
  dashboard: "dashboard",
  resources: "resources",
  settings: "settings",
}

export const NavbarBreadcrumb = () => {
  const t = useTranslations("common.pages")
  const pathname = usePathname()

  const pathSegments = pathname.split("/").filter((segment) => segment)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="size-4" />
              <span className="sr-only">{t("dashboard")}</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1

          // Use the mapping to get the correct translation key, or fallback to the segment itself
          const translationKey =
            pathMap[segment] || (segment as keyof IntlMessages["common"])

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{t(translationKey)}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={href}>{t(translationKey)}</Link>
                    </BreadcrumbLink>
                  </>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
