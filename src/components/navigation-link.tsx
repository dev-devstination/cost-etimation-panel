"use client"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Link, usePathname } from "@/config/navigation"

interface NavigationLinkProps {
  href: string
  icon: LucideIcon
  label: string
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  icon: Icon,
  label,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center rounded-lg p-2 transition-colors",
          "hover:bg-primary/10 hover:text-primary",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isActive && "bg-primary/15 font-medium text-primary",
          "rtl:flex-row-reverse"
        )}
      >
        <Icon
          className={cn(
            "size-5",
            isActive ? "text-primary" : "text-muted-foreground",
            "ltr:mr-3 rtl:ml-3"
          )}
        />
        <span>{label}</span>
      </Link>
    </li>
  )
}
