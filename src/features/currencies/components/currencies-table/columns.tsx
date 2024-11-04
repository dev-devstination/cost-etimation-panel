"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ColumnHeader } from "@/components/column-header"
import { Actions } from "@/features/currencies/components/currencies-table/actions"
import { Currency } from "@/features/currencies/interfaces/currency"
import { EditCodeCell } from "@/features/currencies/components/currencies-table/edit-code-cell"
import { EditCurrencyCell } from "@/features/currencies/components/currencies-table/edit-currency-cell"
import { EditCountryCell } from "@/features/currencies/components/currencies-table/edit-country-cell"
import { EditExchangeRateCell } from "@/features/currencies/components/currencies-table/edit-exchange-rate-cell"

export const columns: ColumnDef<Currency>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="code" sortable />
    },
    cell: ({ row }) => <EditCodeCell currency={row.original} />,
  },
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="currency" sortable />
    },
    cell: ({ row }) => <EditCurrencyCell currency={row.original} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="description" sortable />
    },
    cell: ({ row }) => <EditCountryCell currency={row.original} />,
  },
  {
    accessorKey: "exchange_rate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="exchange_rate" sortable />
    },
    cell: ({ row }) => <EditExchangeRateCell currency={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions currency={row.original} />,
  },
]
