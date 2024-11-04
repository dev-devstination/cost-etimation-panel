"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Actions } from "@/features/projects/components/projects-table/actions"
import { Project } from "@/features/projects/interfaces/project"
import { Category } from "@/types"

export interface ProjectRowProps extends Project {
  categories: Category[]
}

export const columns: ColumnDef<ProjectRowProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
  },
  {
    accessorKey: "client_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="clientName" sortable />
    },
  },
  {
    accessorKey: "consultant_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="consultantName" sortable />
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="area" sortable />
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions project={row.original} />,
  },
]
