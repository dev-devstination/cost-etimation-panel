import { useLocale, useTranslations } from "next-intl"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"

export const Filters = () => {
  const t = useTranslations("resources")
  const locale = useLocale()

  const isRTL = locale === "ar"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="size-4" />
          {t("filters.title")}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isRTL ? "left" : "right"}
        className="w-[300px] sm:w-[400px]"
      >
        <SheetHeader>
          <SheetTitle>{t("filters.title")}</SheetTitle>
          <SheetDescription>{t("filters.description")}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
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
              <SelectItem value="all">
                {t("filters.allSubcategories")}
              </SelectItem>
              {/* Add more subcategories here */}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder={t("filters.resouceType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("filters.allResourceTypes")}
              </SelectItem>
              {/* Add more categories here */}
            </SelectContent>
          </Select>
          <Input placeholder={t("filters.search")} />
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
          <SheetClose asChild>
            <Button type="button" className="mt-4">
              {t("filters.apply")}
            </Button>
          </SheetClose>
          <Button
            type="button"
            variant="outline"
            className="flex-1 gap-2 transition-all duration-300 ease-in-out hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="size-4" />
            {t("filters.clear")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
