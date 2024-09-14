import { Check } from "lucide-react"

interface FlaggedCellProps {
  checked: boolean
}

export const FlaggedCell: React.FC<FlaggedCellProps> = ({ checked }) => {
  return (
    <div className="flex justify-center">
      {checked ? <Check className="h-4 w-4 text-green-500" /> : null}
    </div>
  )
}
