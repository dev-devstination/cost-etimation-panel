import { useTranslations } from "next-intl"

export const AuthLogo = () => {
  const t = useTranslations("components.logo")

  return (
    <>
      <div className="relative inline-block">
        <span className="text-5xl font-black text-primary">
          {t("firstLetter")}
          <span className="text-foreground">{t("secondLetter")}</span>
          {t("restOfWord")}
        </span>
        <span className="absolute right-0 top-0 size-2 animate-ping rounded-full bg-primary"></span>
      </div>
      <div className="mt-2">
        <span className="text-3xl font-light tracking-wide text-foreground">
          {t("subtitle")}
        </span>
      </div>
    </>
  )
}

export const DashboardLogo: React.FC = () => {
  const t = useTranslations("components.logo")

  return (
    <div className="group flex items-center space-x-1 text-2xl font-black">
      <div className="relative transition-transform duration-300 ease-in-out group-hover:scale-105">
        <span className="text-primary">{t("firstLetter")}</span>
        <span className="text-foreground">{t("secondLetter")}</span>
        <span className="text-primary">{t("restOfWord")}</span>
      </div>
      <div className="overflow-hidden">
        <span className="inline-block max-w-0 whitespace-nowrap text-sm font-medium text-muted-foreground opacity-0 transition-all duration-300 ease-in-out group-hover:max-w-xs group-hover:opacity-100">
          {t("subtitle")}
        </span>
      </div>
      <svg
        className="size-5 text-primary transition-transform duration-300 ease-in-out group-hover:rotate-180"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
