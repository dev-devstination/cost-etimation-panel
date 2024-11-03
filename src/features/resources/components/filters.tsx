import { useTranslations } from "next-intl"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export const Filters = () => {
  const t = useTranslations("ResourcesPage")

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input placeholder={t("filters.search")} />

        <Select>
          <SelectTrigger>
            <SelectValue placeholder={t("filters.category")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allCategories")}</SelectItem>
            {/* Add more categories here */}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder={t("filters.subcategory")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allSubcategories")}</SelectItem>
            {/* Add more subcategories here */}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder={t("filters.resouceType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allResourceTypes")}</SelectItem>
            {/* Add more categories here */}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="composite" />
            <label
              htmlFor="composite"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.composite")}
            </label>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="inUse" />
            <label
              htmlFor="inUse"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.inUse")}
            </label>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="master" />
            <label
              htmlFor="master"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("filters.master")}
            </label>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="ml-auto gap-2 transition-all duration-300 ease-in-out hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="size-4" />
          {t("filters.clear")}
        </Button>
      </div>
    </div>
  )
}
