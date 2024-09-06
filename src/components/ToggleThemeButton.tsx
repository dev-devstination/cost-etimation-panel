"use client"

import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("components.toggleTheme")

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("ariaLabel")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{t("srText")}</span>
    </Button>
  )
}
