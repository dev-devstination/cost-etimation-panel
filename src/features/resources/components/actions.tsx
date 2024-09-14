import { Eye, Trash2, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Resource } from "@/features/resources/types"
import { useTranslations } from "next-intl"

interface ActionsProps {
  resource: Resource
}

export const Actions: React.FC<ActionsProps> = ({ resource }) => {
  const t = useTranslations("common")
  console.log("Resource: ", resource)
  return (
    <div className="flex items-center space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
            <span className="sr-only">{t("view")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("view")}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">{t("delete")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("delete")}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <History className="h-4 w-4" />
            <span className="sr-only">{t("priceHistory")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("priceHistory")}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
