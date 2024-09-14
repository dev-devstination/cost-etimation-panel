"use client"

import { useTranslations } from "next-intl"
import { Table } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

interface SelectAllColumnProps<TData> {
  table: Table<TData>
  title: keyof IntlMessages["common"]["commonTableHeaders"]
}

export function SelectAllColumn<TData>({
  table,
  title,
}: SelectAllColumnProps<TData>) {
  const t = useTranslations("common")

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t("selectAll")}
      />
      <span className="text-sm font-medium">
        {t(`commonTableHeaders.${title}`)}
      </span>
    </div>
  )
}
