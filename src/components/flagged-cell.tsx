import { Check } from "lucide-react"

interface FlaggedCellProps {
  checked: boolean
}

export const FlaggedCell: React.FC<FlaggedCellProps> = ({ checked }) => {
  return (
    <div className="flex justify-center">
      {checked ? <Check className="size-4 text-green-500" /> : null}
    </div>
  )
}
