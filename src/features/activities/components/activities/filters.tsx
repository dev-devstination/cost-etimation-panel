import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"

import { useRouter } from "@/config/navigation"
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
import { Label } from "@/components/ui/label"
import { SelectOption } from "@/types"

import { ActivityFilters } from "@/features/activities/types"

interface FiltersProps {
  // eslint-disable-next-line no-unused-vars
  onSearchChange: (value: string) => void
  searchValue: string
  // eslint-disable-next-line no-unused-vars
  onFilterChange: (filters: ActivityFilters) => void
  filters: ActivityFilters
  categoriesOptions: SelectOption[]
  subcategoriesOptions: (SelectOption & { category_id: string })[]
}

export const Filters: React.FC<FiltersProps> = ({
  onSearchChange,
  searchValue,
  onFilterChange,
  filters,
  categoriesOptions,
  subcategoriesOptions,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const t = useTranslations("ActivitiesPage")

  const selectedCategory = searchParams.get("category") || ""
  const selectedSubcategory = searchParams.get("subcategory") || ""
  const isActive = searchParams.get("active") === "true"

  const handleCategoryChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (value) {
      newSearchParams.set("category", value)
      // Clear subcategory when changing category
      newSearchParams.delete("subcategory")
    } else {
      newSearchParams.delete("category")
      newSearchParams.delete("subcategory")
    }

    router.push(`/activities?${newSearchParams.toString()}`)
  }

  const handleSubcategoryChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (value) {
      newSearchParams.set("subcategory", value)
    } else {
      newSearchParams.delete("subcategory")
    }

    router.push(`/activities?${newSearchParams.toString()}`)
  }

  const handleActiveChange = (checked: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (checked) {
      newSearchParams.set("active", "true")
    } else {
      newSearchParams.delete("active")
    }

    router.push(`/activities?${newSearchParams.toString()}`)
  }

  // Filter subcategories based on selected category
  const filteredSubcategories = subcategoriesOptions.filter(
    (sub) => !selectedCategory || sub.category_id === selectedCategory
  )

  const handleFilterChange = <K extends keyof ActivityFilters>(
    key: K,
    value: ActivityFilters[K]
  ) => {
    onFilterChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete("category")
    newSearchParams.delete("subcategory")
    newSearchParams.delete("active")

    router.push(`/activities?${newSearchParams.toString()}`)

    onFilterChange({
      isMaster: false,
    })
    onSearchChange("")
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder={t("filters.search")}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder={t("filters.category")} />
          </SelectTrigger>
          <SelectContent>
            {categoriesOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSubcategory}
          onValueChange={handleSubcategoryChange}
          disabled={!selectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filters.subcategory")} />
          </SelectTrigger>
          <SelectContent>
            {filteredSubcategories.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox
              id="master"
              checked={filters.isMaster}
              onCheckedChange={(checked: boolean) =>
                handleFilterChange("isMaster", checked)
              }
            />
            <Label htmlFor="master">{t("filters.master")}</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="active"
            checked={isActive}
            onCheckedChange={handleActiveChange}
          />
          <Label htmlFor="active">{t("filters.active")}</Label>
        </div>

        {(searchValue ||
          selectedCategory ||
          selectedSubcategory ||
          isActive) && (
          <Button
            onClick={clearFilters}
            variant="link"
            type="button"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="size-4" />
            {t("filters.clear")}
          </Button>
        )}
      </div>
    </div>
  )
}
