import { Resource } from "@/features/resources/types"
import { StateAction } from "./state-action"
import { ViewAction } from "./view-action"

interface ActionsProps {
  resource: Resource
}

export const Actions: React.FC<ActionsProps> = ({ resource }) => {
  return (
    <div className="flex items-center space-x-2" data-prevent-propagation>
      <ViewAction resource={resource} />

      <StateAction resource={resource} />

      {/* <Dialog>
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
      </Dialog> */}
    </div>
  )
}
