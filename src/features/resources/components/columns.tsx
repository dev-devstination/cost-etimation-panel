"use client"

import { CalendarIcon } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { Resource } from "@/features/resources/types"
import { Actions } from "@/features/resources/components/actions"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectAllColumn } from "@/components/select-header"
import { ColumnHeader } from "@/components/column-header"
import { FlaggedCell } from "@/components/flagged-cell"
import { InputCell } from "@/components/input-cell"

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
      return <ColumnHeader column={column} title="description" sortable />
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="unit" />
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.original.unit}</div>
    },
  },
  {
    accessorKey: "basicRate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="basicRate" />
    },
    cell: ({ row }) => {
      const amount = row.original.basicRate
      const formatted = amount.toFixed(2)
      return <InputCell defaultValue={formatted} />
    },
  },
  {
    accessorKey: "factor",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="factor" />
    },
    cell: ({ row }) => {
      const amount = row.original.factor
      const formatted = amount.toFixed(2)
      return <InputCell defaultValue={formatted} />
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="rate" />
    },
    cell: ({ row }) => {
      const basicRate = row.original.basicRate
      const factor = row.original.factor
      const rate = basicRate * factor
      const formatted = rate.toFixed(2)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "composite",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="composite" />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.isComposite} />,
  },

  {
    accessorKey: "isMaster",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="master" />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.isMaster} />,
  },
  {
    accessorKey: "isUsed",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="inUse" />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.isUsed} />,
  },
  {
    accessorKey: "updatedDate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="lastUpdated" sortable />
    },
    cell: ({ row }) => {
      const date = new Date(row.original.updatedDate)
      return (
        <div className="flex items-center">
          <CalendarIcon className="mr-2 size-4 opacity-50" />
          <span className="text-sm">{format(date, "MMM dd, yyyy")}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions resource={row.original} />,
  },
]
