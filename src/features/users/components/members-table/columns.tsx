"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Member } from "@/features/users/interfaces/member"
import { FlaggedCell } from "@/components/flagged-cell"

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="email" sortable />
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="role" sortable />
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="active" />
    },
    cell: ({ row }) => <FlaggedCell checked={row.original.active} />,
  },
]
