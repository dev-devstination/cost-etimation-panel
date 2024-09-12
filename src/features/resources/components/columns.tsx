"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Resource } from "@/features/resources/types"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectAllColumn } from "@/components/select-header"

export const columns: ColumnDef<Resource>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return <SelectAllColumn table={table} title="code" />
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <span className="text-sm font-medium">{row.original.code}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "subCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sub-Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "composite",
    header: "Composite",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.isComposite ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: "basicRate",
    header: "Basic Rate",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("basicRate"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "factor",
    header: "Factor",
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      const basicRate = parseFloat(row.getValue("basicRate"))
      const factor = parseFloat(row.getValue("factor"))
      const rate = basicRate * factor
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(rate)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "isMaster",
    header: "Master",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.isMaster ? (
          <Check className="h-4 w-4 text-blue-500" />
        ) : null}
      </div>
    ),
  },
  {
    accessorKey: "isUsed",
    header: "In Use",
    cell: ({ row }) => (
      <div className="flex justify-center">
        {row.original.isUsed ? (
          <Check className="h-4 w-4 text-purple-500" />
        ) : null}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const resource = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Resource</DropdownMenuItem>
            <DropdownMenuItem>Delete Resource</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
