"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Resource } from "@/features/resources/types"
import { Actions } from "@/features/resources/components/actions"
import { Checkbox } from "@/components/ui/checkbox"
import { SelectAllColumn } from "@/components/select-header"
import { ColumnHeader } from "@/components/column-header"
import { FlaggedCell } from "@/components/flagged-cell"

import { FactorColumn } from "./factor-column"
import { ResourceInputCell } from "./resource-input-cell"

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
      return <div className="text-center">{row.original.unit.name}</div>
    },
  },
  {
    accessorKey: "basic_rate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="basicRate" sortable />
    },
    cell: ({ row }) => {
      return <ResourceInputCell index={row.index} name="basic_rate" />
    },
  },
  {
    accessorKey: "factor",
    header: () => {
      return <FactorColumn />
    },
    cell: ({ row }) => {
      return <ResourceInputCell index={row.index} name="factor" />
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="rate" sortable />
    },
    cell: ({ row }) => {
      return (
        <ResourceInputCell
          resource={row.original}
          index={row.index}
          name="rate"
        />
      )
    },
  },
  {
    accessorKey: "isComposite",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="composite" sortable />
    },
    cell: ({ row }) => <FlaggedCell checked={!!row.original.children} />,
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
  //   cell: () => <FlaggedCell checked={false} />,
  // },
  // {
  //   accessorKey: "updatedDate",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="lastUpdated" sortable />
  //   },
  //   cell: () => {
  //     const date = new Date().getMilliseconds()
  //     return (
  //       <div className="flex items-center">
  //         <CalendarIcon className="mr-2 size-4 opacity-50" />
  //         <span className="text-sm">{formatDate(date)}</span>
  //       </div>
  //     )
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <Actions resource={row.original} />,
  },
]
