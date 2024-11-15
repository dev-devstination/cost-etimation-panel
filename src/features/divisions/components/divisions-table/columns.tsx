"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Division } from "@/features/divisions/interfaces/division"
import { Project } from "@/features/projects/interfaces/project"
import { EditDivisionProjectCell } from "@/features/divisions/components/divisions-table/edit-division-project-cell"
import { EditDivisionDescriptionCell } from "@/features/divisions/components/divisions-table/edit-division-description-cell"
import { EditDivisionNumberCell } from "@/features/divisions/components/divisions-table/edit-division-number-cell"

export interface DivisionRow extends Division {
  projects: Project[]
}

export const columns: ColumnDef<DivisionRow>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditDivisionNumberCell division={row.original} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditDivisionDescriptionCell division={row.original} />,
  },
  {
    accessorKey: "project_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="project" sortable />
    },
    cell: ({ row }) => <EditDivisionProjectCell division={row.original} />,
  },
]
