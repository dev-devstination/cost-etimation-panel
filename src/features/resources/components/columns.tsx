"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Resource } from "@/features/resources/types"

export const columns: ColumnDef<Resource>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "subCategory",
    header: "Sub-Category",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "composite",
    header: "Composite",
  },
  {
    accessorKey: "basicRate",
    header: "Basic Rate",
  },
  {
    accessorKey: "factor",
    header: "Factor",
  },
  {
    accessorKey: "rate",
    header: "Rate",
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
