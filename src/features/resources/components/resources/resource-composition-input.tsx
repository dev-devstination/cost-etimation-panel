import { useEffect, useState } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { CheckCircle, Trash2, X } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form"
import { Input } from "@/components/form/input"
import { SelectOption } from "@/types"

import { ResourceFormData } from "@/features/resources/schemas/resource"
import { Resource } from "@/features/resources/types"
import { Select } from "@/components/form/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ResourceCompositionInputProps {
  resources: Resource[]
  categories: SelectOption[]
  subcategories: (SelectOption & { category_id: string })[]
  resourceCompositions?: ResourceFormData["children"]
  disabled?: boolean
}

export const ResourceCompositionInput: React.FC<
  ResourceCompositionInputProps
> = ({
  resources,
  categories,
  subcategories,
  resourceCompositions,
  disabled,
}) => {
  const t = useTranslations("ResourcePage.form.resource_compositions")
  const [selectedResources, setSelectedResources] = useState<string[]>([])
  const [availableResources, setAvailableResources] = useState<Resource[]>(
    resourceCompositions
      ? resources.filter(
          (resource) =>
            !resourceCompositions.some(
              (comp) => comp.child_resource_id === resource.id
            )
        )
      : resources
  )
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [isMaster, setIsMaster] = useState(false)
  const [isComposite, setIsComposite] = useState(false)

  const form = useFormContext<ResourceFormData>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  })

  useEffect(() => {
    setSelectedSubcategory("")
  }, [selectedCategory])

  useEffect(() => {
    let filteredResources = resources.filter(
      (resource) =>
        !fields.some((field) => field.child_resource_id === resource.id)
    )

    if (searchTerm) {
      filteredResources = filteredResources.filter((resource) =>
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filteredResources = filteredResources.filter(
        (resource) => resource.category.id === selectedCategory
      )
    }

    if (selectedSubcategory) {
      filteredResources = filteredResources.filter(
        (resource) => resource.sub_category.id === selectedSubcategory
      )
    }

    if (isMaster) {
      filteredResources = filteredResources.filter(
        (resource) => resource.master
      )
    }

    if (isComposite) {
      filteredResources = filteredResources.filter(
        (resource) => resource.children?.length
      )
    }

    setAvailableResources(filteredResources)
  }, [
    fields,
    isComposite,
    isMaster,
    resources,
    searchTerm,
    selectedCategory,
    selectedSubcategory,
  ])

  const calculateAmount = (qty: string, rate: number, factor?: string) => {
    return Number(qty) * rate * Number(factor)
  }

  const getTotalAmounts = () => {
    return fields.reduce((total, field, index) => {
      const qty = form.watch(`children.${index}.qty`)
      const factor = form.watch(`children.${index}.factor`)
      const resource = resources.find((r) => r.id === field.child_resource_id)
      if (!resource) {
        return total
      }

      return total + calculateAmount(qty, resource.rate, factor)
    }, 0)
  }

  const handleResourceSelection = (resourceId: string) => {
    setSelectedResources((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    )
  }

  const handleAddResources = () => {
    const newCompositions: ResourceFormData["children"] = []

    selectedResources.forEach((resourceId) => {
      const resource = resources.find((r) => r.id === resourceId)
      if (resource?.children?.length) {
        resource.children.forEach((child) => {
          if (
            !fields.some(
              (field) => field.child_resource_id === child.resource.id
            )
          ) {
            newCompositions.push({
              child_resource_id: child.resource.id,
              qty: child.qty.toString(),
              factor: child.factor.toString(),
            })
          }
        })
      } else if (
        !fields.some((field) => field.child_resource_id === resourceId)
      ) {
        newCompositions.push({
          child_resource_id: resourceId,
          qty: "1",
          factor: "1",
        })
      }
    })

    append(newCompositions)
    setSelectedResources([])
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedSubcategory("")
    setIsComposite(false)
    setIsMaster(false)
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Input
            placeholder={t("searchResources")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          options={categories}
          placeholder={t("selectCategory")}
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
        />

        <Select
          options={subcategories.filter(
            (sub) => !selectedCategory || sub.category_id === selectedCategory
          )}
          placeholder={t("selectSubcategory")}
          onValueChange={(value) => setSelectedSubcategory(value)}
          value={selectedSubcategory}
          disabled={!selectedCategory}
        />
      </div>

      <div className="flex h-9 flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox
              id="composite"
              checked={isComposite}
              onCheckedChange={(checked: boolean) => setIsComposite(checked)}
            />
            <Label htmlFor="composite">{t("isComposite")}</Label>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox
              id="master"
              checked={isMaster}
              onCheckedChange={(checked: boolean) => setIsMaster(checked)}
            />
            <Label htmlFor="master">{t("isMaster")}</Label>
          </div>
        </div>
        {(searchTerm ||
          selectedCategory ||
          selectedSubcategory ||
          isComposite ||
          isMaster) && (
          <Button
            onClick={clearFilters}
            variant="link"
            type="button"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="size-4" />
            {t("clearFilters")}
          </Button>
        )}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Available Resources */}
        <div className="relative space-y-2">
          <h3 className="text-sm font-medium">{t("availableResources")}</h3>

          <div className="h-[400px] overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {!disabled && (
                    <TableHead className="w-[40px] text-center"></TableHead>
                  )}
                  <TableHead className="min-w-[300px]">
                    {t("tableHeaders.description")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.unit")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.isComposite")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.isMaster")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.rate")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableResources.map((resource) => (
                  <TableRow key={resource.id}>
                    {!disabled && (
                      <TableCell className="text-center">
                        <Checkbox
                          id={`resource-${resource.id}`}
                          checked={selectedResources.includes(resource.id)}
                          onCheckedChange={() =>
                            handleResourceSelection(resource.id)
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell className="truncate">
                      {resource.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {resource.unit.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {resource.children?.length ? (
                        <CheckCircle className="mx-auto size-4 text-primary" />
                      ) : null}
                    </TableCell>
                    <TableCell className="text-center">
                      {resource.master ? (
                        <CheckCircle className="mx-auto size-4 text-primary" />
                      ) : null}
                    </TableCell>
                    <TableCell className="text-right">
                      {resource.rate.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!disabled && (
            <Button
              onClick={handleAddResources}
              disabled={selectedResources.length === 0}
              variant="outline"
              size="sm"
            >
              {t("addSelectedResources")}
            </Button>
          )}
        </div>

        {/* Selected Resources */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">{t("selectedResources")}</h3>

          <div className="h-[400px] overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[300px]">
                    {t("tableHeaders.description")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.unit")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.quantity")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.factor")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.rate")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.amount")}
                  </TableHead>
                  {!disabled && <TableHead className="w-[50px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => {
                  const resource = resources.find(
                    ({ id }) => id === field.child_resource_id
                  )
                  if (!resource) return null

                  const quantity = form.watch(`children.${index}.qty`)
                  const factor = form.watch(`children.${index}.factor`)
                  const amount = calculateAmount(
                    quantity,
                    resource.rate,
                    factor
                  )

                  return (
                    <TableRow key={field.id}>
                      <TableCell>{resource.description}</TableCell>
                      <TableCell>{resource.unit.name}</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`children.${index}.qty`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="h-8 w-20 text-center text-sm"
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`children.${index}.factor`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="h-8 w-20 text-center text-sm"
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>{resource.rate.toFixed(2)}</TableCell>
                      <TableCell>{amount.toFixed(2)}</TableCell>
                      {!disabled && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Label>{t("totalCost")}</Label>
            <Input
              value={getTotalAmounts().toFixed(2)}
              disabled
              className="w-40 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
