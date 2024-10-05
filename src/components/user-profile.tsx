"use client"

import { useTranslations } from "next-intl"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsRTLLanguage } from "@/config/locales"
import { redirect } from "@/config/navigation"
import { useTransition } from "react"
import { logoutAction } from "@/features/auth/actions/logout"

export const UserProfile = () => {
  const t = useTranslations("common")
  const [isPending, startTransiton] = useTransition()

  const isRTL = useIsRTLLanguage()

  const logout = () => {
    startTransiton(() => {
      logoutAction()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <User className="overflow-hidden rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"}>
        <DropdownMenuItem onClick={() => redirect("/account")}>
          {t("account")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => redirect("/settings")}>
          {t("settings")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={isPending} onClick={logout}>
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
