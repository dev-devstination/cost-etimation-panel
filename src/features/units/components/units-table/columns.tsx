"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Actions } from "@/features/units/components/units-table/actions"
import { Unit } from "@/features/units/interfaces/unit"
import { EditNameCell } from "@/features/units/components/units-table/edit-name-cell"
import { EditDescriptionCell } from "@/features/units/components/units-table/edit-description-cell"

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditNameCell unit={row.original} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="description" sortable />
    },
    cell: ({ row }) => <EditDescriptionCell unit={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions unit={row.original} />,
  },
]
