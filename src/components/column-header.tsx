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
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {t(`commonTableHeaders.${title}`)}
      <ArrowUpDown className="ltr:ml-2 rtl:mr-2 h-4 w-4" />
    </Button>
  )
}
