import { useFormContext } from "react-hook-form"

import { InputCell } from "@/components/input-cell"
import { FormControl, FormField, FormItem } from "@/components/ui/form"

import { UpdateResourcesSchema } from "../schemas/resource"
import { Resource } from "../types"

interface BasicRateCellProps {
  index: number
  name: "basic_rate" | "factor" | "rate"
  resource?: Resource
}

export const ResourceInputCell: React.FC<BasicRateCellProps> = ({
  index,
  name,
  resource,
}) => {
  const form = useFormContext<UpdateResourcesSchema>()
  const { basic_rate, factor } = form.watch(`resources.${index}`)

  const getResourceRate = () => {
    const initialRate = Number(basic_rate) * Number(factor)

    if (!resource?.children?.length) {
      return initialRate
    }

    const totalCost = resource.children.reduce((total, comp) => {
      return total + comp.amount
    }, 0)

    return initialRate + totalCost
  }

  if (name === "rate") {
    const rate = getResourceRate()
    return <div className="text-center font-medium">{rate.toFixed(2)}</div>
  }

  return (
    <FormField
      control={form.control}
      name={`resources.${index}.${name}`}
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
