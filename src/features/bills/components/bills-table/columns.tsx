"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Bill } from "@/features/bills/interfaces/bills"
import { Project } from "@/features/projects/interfaces/project"
import { EditBillProjectCell } from "@/features/bills/components/bills-table/edit-bill-project-cell"
import { EditBillDescriptionCell } from "@/features/bills/components/bills-table/edit-bill-description-cell"
import { EditBillNumberCell } from "@/features/bills/components/bills-table/edit-bill-number-cell"

export interface BillsRow extends Bill {
  projects: Project[]
}

export const columns: ColumnDef<BillsRow>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditBillNumberCell bill={row.original} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="name" sortable />
    },
    cell: ({ row }) => <EditBillDescriptionCell bill={row.original} />,
  },
  {
    accessorKey: "project_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="project" sortable />
    },
    cell: ({ row }) => <EditBillProjectCell bill={row.original} />,
  },
]
