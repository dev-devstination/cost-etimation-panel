"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Actions } from "@/features/activities/components/activities/table/actions"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectAllColumn } from "@/components/select-header"
import { ColumnHeader } from "@/components/column-header"
import { FlaggedCell } from "@/components/flagged-cell"

import { Activity } from "@/features/activities/types"
import { ActivityInputCell } from "./activity-input-cell"

export const columns: ColumnDef<Activity>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return <SelectAllColumn table={table} title="code" />
    },
    cell: ({ row }) => (
      <div className="flex items-center space-x-2" data-prevent-propagation>
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
      return <ColumnHeader column={column} title="description" sortable />
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="unit" sortable />
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.unit.name}</div>
    },
  },
  {
    accessorKey: "output",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="output" sortable />
    },
    cell: ({ row }) => {
      return <ActivityInputCell index={row.index} name="output" />
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="rate" sortable />
    },
    cell: ({ row }) => {
      return (
        <ActivityInputCell
          index={row.index}
          name="rate"
          activity={row.original}
        />
      )
    },
  },
  {
    accessorKey: "master",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="master" sortable />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.master} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions activity={row.original} />,
  },
]
