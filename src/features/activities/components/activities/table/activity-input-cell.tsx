import { useFormContext } from "react-hook-form"

import { InputCell } from "@/components/input-cell"
import { FormControl, FormField, FormItem } from "@/components/ui/form"

import { Activity } from "@/features/activities/types"
import { UpdateActivitiesSchema } from "@/features/activities/schemas/activity"

interface ActivityInputCellProps {
  index: number
  name: "output" | "rate"
  activity?: Activity
}

export const ActivityInputCell: React.FC<ActivityInputCellProps> = ({
  index,
  name,
  activity,
}) => {
  const form = useFormContext<UpdateActivitiesSchema>()
  const { output } = form.watch(`activities.${index}`)

  const getActivityRate = () => {
    if (!activity) {
      return 0
    }

    const totalCost = activity?.children.reduce((total, comp) => {
      return total + comp.amount
    }, 0)

    return totalCost / Number(output)
  }

  if (name === "rate") {
    const rate = getActivityRate()
    return <div className="text-center font-medium">{rate.toFixed(2)}</div>
  }

  return (
    <FormField
      control={form.control}
      name={`activities.${index}.${name}`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <InputCell {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
