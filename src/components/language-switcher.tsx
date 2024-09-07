"use client"

import { useTransition } from "react"
import { useParams } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Languages } from "lucide-react"

import { useRouter, usePathname } from "@/config/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Locale, locales } from "@/config/locales"

const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("layout")

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale !== currentLocale) {
      startTransition(() => {
        router.replace(
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          { params, locale: newLocale }
        )
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          disabled={isPending}
          aria-label={t("changeLanguage")}
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t("currentLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={currentLocale === "en" ? "end" : "start"}
        className="w-36"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            {t(`language.${locale}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
