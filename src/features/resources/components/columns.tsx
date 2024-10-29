"use client"

import { CalendarIcon } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
// import { format } from "date-fns"

import { Resource } from "@/features/resources/types"
import { Actions } from "@/features/resources/components/actions"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectAllColumn } from "@/components/select-header"
import { ColumnHeader } from "@/components/column-header"
import { FlaggedCell } from "@/components/flagged-cell"
import { InputCell } from "@/components/input-cell"
import { FactorColumn } from "./factor-column"

export const columns: ColumnDef<Resource>[] = [
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
      return <div className="text-center">{row.original.unit_id}</div>
    },
  },
  {
    accessorKey: "basic_rate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="basicRate" sortable />
    },
    cell: ({ row }) => {
      const amount = row.original.basic_rate
      const formatted = amount.toFixed(2)
      return <InputCell defaultValue={formatted} />
    },
  },
  {
    accessorKey: "factor",
    header: () => {
      return <FactorColumn />
    },
    cell: ({ row }) => {
      const amount = row.original.factor
      const formatted = amount.toFixed(2)
      return <InputCell defaultValue={formatted} />
    },
  },
  {
    accessorKey: "rate",
    accessorFn: (resource) => {
      const basicRate = resource.rate
      const factor = resource.factor
      return basicRate * factor
    },
    header: ({ column }) => {
      return <ColumnHeader column={column} title="rate" sortable />
    },
    cell: ({ row }) => {
      const basicRate = row.original.rate
      const factor = row.original.factor
      const rate = basicRate * factor
      const formatted = rate.toFixed(2)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "isComposite",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="composite" sortable />
    },
    cell: ({ row }) => (
      <FlaggedCell checked={!!row.original.resource_compositions} />
    ),
  },
  {
    accessorKey: "master",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="master" sortable />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.master} />,
  },
  // {
  //   accessorKey: "isUsed",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="inUse" sortable />
  //   },
  //   cell: ({ row }) => <FlaggedCell checked={row.original.isUsed} />,
  // },
  // {
  //   accessorKey: "updatedDate",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="lastUpdated" sortable />
  //   },
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.updatedDate)
  //     return (
  //       <div className="flex items-center">
  //         <CalendarIcon className="mr-2 size-4 opacity-50" />
  //         <span className="text-sm">{format(date, "MMM dd, yyyy")}</span>
  //       </div>
  //     )
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <Actions resource={row.original} />,
  },
]
