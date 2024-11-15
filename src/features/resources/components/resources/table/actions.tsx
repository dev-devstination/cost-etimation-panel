import { Resource } from "@/features/resources/types"
import { StateAction } from "@/features/resources/components/resources/table/state-action"
import { ViewAction } from "@/features/resources/components/resources/table/view-action"
import { CloneAction } from "@/features/resources/components/resources/table/clone-action"

interface ActionsProps {
  resource: Resource
}

export const Actions: React.FC<ActionsProps> = ({ resource }) => {
  return (
    <div className="flex items-center space-x-2" data-prevent-propagation>
      <ViewAction resource={resource} />

      <CloneAction resource={resource} />

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
