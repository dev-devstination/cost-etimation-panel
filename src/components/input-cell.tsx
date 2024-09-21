import { useEffect, useRef, useState } from "react"

import { Input } from "@/components/ui/input"
import { Pencil } from "lucide-react"

interface BasicRateCellProps {
  defaultValue: string
}

export const InputCell: React.FC<BasicRateCellProps> = ({ defaultValue }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [tempValue, setTempValue] = useState(defaultValue)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    if (tempValue !== value) {
      setValue(tempValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setTempValue(value)
      setIsEditing(false)
    }
  }

  return (
    <div
      className="group relative w-24 cursor-pointer"
      onClick={() => !isEditing && setIsEditing(true)}
      data-actions-column
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="h-8 w-full px-2 py-1 text-center text-sm focus:ring-2 focus:ring-primary"
        />
      ) : (
        <div className="flex h-8 items-center justify-center rounded transition-all duration-200 ease-in-out group-hover:bg-muted/50">
          <span className="text-sm font-medium">{value}</span>
          <Pencil className="ml-1 size-3 text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
      )}
    </div>
  )
}
