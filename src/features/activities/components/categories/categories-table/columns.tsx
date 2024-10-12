"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Actions } from "@/features/activities/components/categories/categories-table/actions"
import { Category } from "@/features/activities/interfaces/category"
import { EditCategoryCell } from "@/features/activities/components/categories/categories-table/edit-category-cell"

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditCategoryCell category={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions category={row.original} />,
  },
]
