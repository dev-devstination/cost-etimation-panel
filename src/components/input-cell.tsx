import React from "react"

import { Input } from "@/components/ui/input"

interface BasicRateCellProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputCell = React.forwardRef<HTMLInputElement, BasicRateCellProps>(
  ({ ...props }, ref) => {
    return (
      <div
        className="group relative flex h-8 items-center justify-center rounded transition-all duration-200 ease-in-out group-hover:bg-muted/50"
        data-prevent-propagation
      >
        <Input
          ref={ref}
          className="h-8 w-24 px-2 py-1 text-center text-sm"
          {...props}
        />
      </div>
    )
  }
)

InputCell.displayName = "InputCell"
