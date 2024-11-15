import { useTranslations } from "next-intl"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "@/config/navigation"
import { Resource } from "@/features/resources/types"

interface CloneActionProps {
  resource: Resource
}

export const CloneAction: React.FC<CloneActionProps> = ({ resource }) => {
  const t = useTranslations("common")

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link href={`/resources/${resource.id}?clone=true`}>
            <Copy className="size-4" />
            <span className="sr-only">{t("view")}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("clone")}</p>
      </TooltipContent>
    </Tooltip>
  )
}
