"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { FlaggedCell } from "@/components/flagged-cell"
import { Actions } from "@/features/activities/components/categories-table/actions"
import { ActivityCategory } from "@/features/activities/interfaces/activity-category"
import { EditCategoryCell } from "@/features/activities/components/categories-table/edit-category-cell"

export const columns: ColumnDef<ActivityCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditCategoryCell category={row.original} />,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="active" />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.active} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions category={row.original} />,
  },
]
