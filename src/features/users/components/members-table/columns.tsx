"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Member } from "@/features/users/interfaces/member"
import { FlaggedCell } from "@/components/flagged-cell"
import { Actions } from "@/features/users/components/members-table/actions"

export interface MemberRow extends Member {
  currentUserId: string
}

export const columns: ColumnDef<MemberRow>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => <Actions member={row.original} />,
  },
]
