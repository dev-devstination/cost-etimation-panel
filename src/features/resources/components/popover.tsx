"use client"

import { Layers, Tag } from "lucide-react"
import { useTranslations } from "next-intl"

import { Resource } from "@/features/resources/types"

interface PopoverProps {
  data: Resource
}

export const Popover: React.FC<PopoverProps> = ({ data }) => {
  const t = useTranslations("resources.table")

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{data.description}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Tag className="size-4 text-primary" />
          <span className="text-sm font-medium">{t("category")} </span>
          <span className="text-sm">{data.category}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Layers className="size-4 text-primary" />
          <span className="text-sm font-medium">{t("subCategory")} </span>
          <span className="text-sm">{data.subCategory}</span>
        </div>
      </div>
    </div>
  )
}
