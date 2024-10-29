import { useTranslations } from "next-intl"
import { Column } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SortableColumnHeaderProps<TData> {
  column: Column<TData>
  title: keyof IntlMessages["common"]["commonTableHeaders"]
  sortable?: boolean
}

export function ColumnHeader<TData>({
  column,
  title,
  sortable = false,
}: SortableColumnHeaderProps<TData>) {
  const t = useTranslations("common")

  if (!sortable) {
    return <div className="text-center">{t(`commonTableHeaders.${title}`)}</div>
  }

  return (
    <div className="flex items-center gap-x-2">
      <span className="shrink-0">{t(`commonTableHeaders.${title}`)}</span>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <ArrowUpDown className="size-4" />
      </Button>
    </div>
  )
}
