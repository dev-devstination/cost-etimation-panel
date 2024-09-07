import { useTranslations } from "next-intl"

export const AuthLogo = () => {
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

export const DashboardLogo: React.FC = () => {
  const t = useTranslations("components.logo")

  return (
    <div className="flex items-center space-x-1 font-black text-2xl group">
      <div className="relative transition-transform duration-300 ease-in-out transform group-hover:scale-105">
        <span className="text-primary">{t("firstLetter")}</span>
        <span className="text-foreground">{t("secondLetter")}</span>
        <span className="text-primary">{t("restOfWord")}</span>
      </div>
      <div className="overflow-hidden">
        <span className="text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-xs inline-block whitespace-nowrap">
          {t("subtitle")}
        </span>
      </div>
      <svg
        className="w-5 h-5 text-primary transition-transform duration-300 ease-in-out transform group-hover:rotate-180"
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
