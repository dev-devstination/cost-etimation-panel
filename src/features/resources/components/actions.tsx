import { useTranslations } from "next-intl"
import { Eye, Trash2, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Resource } from "@/features/resources/types"
import { PriceHistory } from "@/features/resources/components/price-history"

interface ActionsProps {
  resource: Resource
}

export const Actions: React.FC<ActionsProps> = ({ resource }) => {
  const t = useTranslations("common")
  console.log("Resource: ", resource)
  return (
    <div className="flex items-center space-x-2" data-actions-column>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <Eye className="size-4" />
            <span className="sr-only">{t("view")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("view")}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <Trash2 className="size-4" />
            <span className="sr-only">{t("delete")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("delete")}</p>
        </TooltipContent>
      </Tooltip>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <History className="size-4" />
                  <span className="sr-only">{t("priceHistory")}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("priceHistory")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>{resource.description}</DialogTitle>
            <DialogDescription>{t("priceHistory")}</DialogDescription>
          </DialogHeader>
          <PriceHistory resource={resource} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
