import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"

interface BasicRateCellProps {
  defaultValue: string
}

export const InputCell: React.FC<BasicRateCellProps> = ({ defaultValue }) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <div
      className="group relative flex h-8 items-center justify-center rounded transition-all duration-200 ease-in-out group-hover:bg-muted/50"
      data-prevent-propagation
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-8 w-24 border-0 bg-transparent px-2 py-1 text-center text-sm focus:ring-2 focus:ring-primary"
      />
      <Pencil className="absolute ml-1 size-3 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 ltr:right-4 rtl:left-4" />
    </div>
  )
}
