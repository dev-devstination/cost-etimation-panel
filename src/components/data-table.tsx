"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  Row,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TablePagination } from "@/components/table-pagination"
import {
  Popover,
  PopoverContent as UIPopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type AccessorKeys<T> = T extends { accessorKey: infer K }
  ? K extends string
    ? K
    : never
  : never

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKeys?: AccessorKeys<ColumnDef<TData, TValue>>[]
  PopoverContent?: React.ComponentType<{ data: TData }>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  PopoverContent,
}: DataTableProps<TData, TValue>) {
  const [openPopoverId, setOpenPopoverId] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const t = useTranslations("common")
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const handleRowClick = (e: React.MouseEvent, row: Row<TData>) => {
    const target = e.target as HTMLElement
    const isActionColumn = target.closest("[data-actions-column]")
    const isDialog = target.closest("[role='dialog']")
    const isOverlay = target.closest("[data-overlay]")

    // Check if the click target is within the actions column
    if (!isActionColumn && !isDialog && !isOverlay) {
      setOpenPopoverId(openPopoverId === row.id ? null : row.id)
    }
  }

  const renderRow = (row: Row<TData>) => {
    if (PopoverContent) {
      return (
        <Popover
          key={row.id}
          open={openPopoverId === row.id}
          onOpenChange={(open) => !open && setOpenPopoverId(null)}
        >
          <PopoverTrigger asChild>
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="cursor-pointer transition-colors hover:bg-muted/50"
              onClick={(e) => handleRowClick(e, row)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          </PopoverTrigger>
          <UIPopoverContent className="w-80">
            <PopoverContent data={row.original} />
          </UIPopoverContent>
        </Popover>
      )
    }

    return (
      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
        {row.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(renderRow)
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {t("noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {t("rowsSelected", {
            selected: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t("next")}
        </Button>
      </div> */}
    </div>
  )
}
