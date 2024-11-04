"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Actions } from "@/features/activities/components/subcategories/subcategories-table/actions"
import { Subcategory } from "@/types"
import { EditSubcategoryNameCell } from "@/features/activities/components/subcategories/subcategories-table/edit-subcategory-name-cell"
import { Category } from "@/types"
import { EditSubcategoryCategoryCell } from "./edit-subcategory-category-cell"

export interface SubcategoriesRow extends Subcategory {
  categories: Category[]
}

export const columns: ColumnDef<SubcategoriesRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditSubcategoryNameCell subcategory={row.original} />,
  },
  {
    accessorKey: "category_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="category" sortable />
    },
    cell: ({ row }) => (
      <EditSubcategoryCategoryCell subcategory={row.original} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions subcategory={row.original} />,
  },
]
