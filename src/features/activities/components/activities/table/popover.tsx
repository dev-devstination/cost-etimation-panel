"use client"

import { Layers, Tag } from "lucide-react"
import { useTranslations } from "next-intl"

import { Activity } from "@/features/activities/types"

interface PopoverProps {
  data: Activity
}

export const Popover: React.FC<PopoverProps> = ({ data }) => {
  const t = useTranslations("ResourcesPage.table")

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{data.description}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Tag className="size-4 text-primary" />
          <span className="text-sm font-medium">{t("category")} </span>
          <span className="text-sm">{data.category.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Layers className="size-4 text-primary" />
          <span className="text-sm font-medium">{t("subCategory")} </span>
          <span className="text-sm">{data.sub_category.name}</span>
        </div>
      </div>
    </div>
  )
}
