import { useTranslations } from "next-intl"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "@/config/navigation"
import { Activity } from "@/features/activities/types"

interface ViewActionProps {
  activity: Activity
}

export const ViewAction: React.FC<ViewActionProps> = ({ activity }) => {
  const t = useTranslations("common")

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link href={`/activities/${activity.id}`}>
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
