import { Activity } from "@/features/activities/types"
import { ViewAction } from "@/features/activities/components/activities/table/view-action"
import { StateAction } from "@/features/activities/components/activities/table/state-action"
import { CloneAction } from "@/features/activities/components/activities/table/clone-action"

interface ActionsProps {
  activity: Activity
}

export const Actions: React.FC<ActionsProps> = ({ activity }) => {
  return (
    <div className="flex items-center space-x-2" data-prevent-propagation>
      <ViewAction activity={activity} />
      <CloneAction activity={activity} />
      <StateAction activity={activity} />
    </div>
  )
}
