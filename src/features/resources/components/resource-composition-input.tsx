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

import { ResourceFormData } from "../schemas/resource"
import { Resource } from "../types"
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
  resourceCompositions?: ResourceFormData["resource_compositions"]
}

export const ResourceCompositionInput: React.FC<
  ResourceCompositionInputProps
> = ({ resources, categories, subcategories, resourceCompositions }) => {
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

  const form = useFormContext<ResourceFormData>()
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "resource_compositions",
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

    setAvailableResources(filteredResources)
  }, [fields, resources, searchTerm, selectedCategory, selectedSubcategory])

  const calculateAmount = (qty: string, rate: number) => {
    return Number(qty) * rate
  }

  const getTotalCost = () => {
    return fields.reduce((total, field, index) => {
      const resource = resources.find((r) => r.id === field.child_resource_id)
      if (!resource) return total
      const rate = resource.basic_rate * resource.factor
      return (
        total +
        calculateAmount(form.watch(`resource_compositions.${index}.qty`), rate)
      )
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
    const newCompositions: ResourceFormData["resource_compositions"] = []

    selectedResources.forEach((resourceId) => {
      const resource = resources.find((r) => r.id === resourceId)
      if (resource?.resource_compositions?.length) {
        resource.resource_compositions.forEach((comp) => {
          if (
            !fields.some(
              (field) => field.child_resource_id === comp.child_resource_id
            )
          ) {
            newCompositions.push({
              child_resource_id: comp.child_resource_id,
              qty: comp.qty.toString(),
            })
          }
        })
      } else if (
        !fields.some((field) => field.child_resource_id === resourceId)
      ) {
        newCompositions.push({ child_resource_id: resourceId, qty: "1" })
      }
    })

    append(newCompositions)
    setSelectedResources([])
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
    setSelectedSubcategory("")
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Input
            placeholder={t("searchResources")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {(searchTerm || selectedCategory || selectedCategory) && (
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

        <div className="grid grid-cols-2 gap-2">
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
                  <TableHead className="w-[40px] text-center"></TableHead>
                  <TableHead className="min-w-[300px]">
                    {t("tableHeaders.description")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.unit")}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {t("tableHeaders.isComposite")}
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    {t("tableHeaders.factor")}
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    {t("tableHeaders.rate")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="text-center">
                      <Checkbox
                        id={`resource-${resource.id}`}
                        checked={selectedResources.includes(resource.id)}
                        onCheckedChange={() =>
                          handleResourceSelection(resource.id)
                        }
                      />
                    </TableCell>
                    <TableCell className="truncate">
                      {resource.description}
                    </TableCell>
                    <TableCell className="text-center">
                      {resource.unit.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {resource.resource_compositions?.length ? (
                        <CheckCircle className="mx-auto size-4 text-primary" />
                      ) : null}
                    </TableCell>
                    <TableCell className="text-right">
                      {resource.factor.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {(resource.basic_rate * resource.factor).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            onClick={handleAddResources}
            disabled={selectedResources.length === 0}
            variant="outline"
            size="sm"
          >
            {t("addSelectedResources")}
          </Button>
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
                  <TableHead className="w-[100px] text-right">
                    {t("tableHeaders.factor")}
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    {t("tableHeaders.rate")}
                  </TableHead>
                  <TableHead className="w-[100px] text-right">
                    {t("tableHeaders.amount")}
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => {
                  const resource = resources.find(
                    ({ id }) => id === field.child_resource_id
                  )
                  if (!resource) return null
                  const rate = resource.basic_rate * resource.factor
                  const quantity = form.watch(
                    `resource_compositions.${index}.qty`
                  )
                  const amount = calculateAmount(quantity, rate)

                  return (
                    <TableRow key={field.id}>
                      <TableCell>{resource.description}</TableCell>
                      <TableCell>{resource.unit.name}</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`resource_compositions.${index}.qty`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              className="h-8 w-20 text-center text-sm"
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>{resource.factor.toFixed(2)}</TableCell>
                      <TableCell>{rate.toFixed(2)}</TableCell>
                      <TableCell>{amount.toFixed(2)}</TableCell>
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
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Label>{t("totalCost")}</Label>
            <Input
              value={getTotalCost().toFixed(2)}
              disabled
              className="w-40 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
