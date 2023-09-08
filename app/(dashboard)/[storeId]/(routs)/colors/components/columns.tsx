'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './CellAction'

export type ColorColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
  },
  {
    accessorKey: 'value',
    header: 'مقدار',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          //Because tailwind does not work correctly with dynamic classes
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
