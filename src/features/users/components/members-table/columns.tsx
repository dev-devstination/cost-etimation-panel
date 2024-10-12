"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Member } from "@/features/users/interfaces/member"
import { Actions } from "@/features/users/components/members-table/actions"
import { RoleResponse } from "@/features/users/interfaces/role"
import { EditRoleCell } from "@/features/users/components/members-table/edit-role-cell"

export interface MemberRow extends Member {
  currentUserId: string
  roles: RoleResponse[]
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
    cell: ({ row }) => <EditRoleCell member={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions member={row.original} />,
  },
]
