import { useTranslations } from "next-intl"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "@/config/navigation"
import { Resource } from "@/features/resources/types"

interface ViewActionProps {
  resource: Resource
}

export const ViewAction: React.FC<ViewActionProps> = ({ resource }) => {
  const t = useTranslations("common")

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link href={`/resources/${resource.id}`}>
            <Eye className="size-4" />
            <span className="sr-only">{t("view")}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("view")}</p>
      </TooltipContent>
    </Tooltip>
  )
}
