import { useTranslations } from "next-intl"

export const Logo = () => {
  const t = useTranslations("components.logo")

  return (
    <>
      <div className="inline-block relative">
        <span className="text-5xl font-black text-primary">
          {t("firstLetter")}
          <span className="text-foreground">{t("secondLetter")}</span>
          {t("restOfWord")}
        </span>
        <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-ping"></span>
      </div>
      <div className="mt-2">
        <span className="text-3xl font-light tracking-wide text-foreground">
          {t("subtitle")}
        </span>
      </div>
    </>
  )
}
