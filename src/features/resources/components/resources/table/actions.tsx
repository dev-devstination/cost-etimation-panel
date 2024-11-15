import { Resource } from "@/features/resources/types"
import { StateAction } from "@/features/resources/components/resources/table/state-action"
import { ViewAction } from "@/features/resources/components/resources/table/view-action"
import { CloneAction } from "@/features/resources/components/resources/table/clone-action"
import { PriceHistory } from "@/features/resources/components/resources/table/price-history"

interface ActionsProps {
  resource: Resource
}

export const Actions: React.FC<ActionsProps> = ({ resource }) => {
  return (
    <div className="flex items-center space-x-2" data-prevent-propagation>
      <ViewAction resource={resource} />
      <CloneAction resource={resource} />
      <PriceHistory resource={resource} />
      <StateAction resource={resource} />
    </div>
  )
}
