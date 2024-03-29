'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './CellAction'

export type ProductColumn = {
  id: string
  name: string
  price: string
  category: string
  size: string
  color: string
  createdAt: string
  isFeatured: boolean
  isArchived: boolean
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
  },
  {
    accessorKey: 'isArchived',
    header: 'آرشیو شده',
  },
  {
    accessorKey: 'isFeatured',
    header: 'ویژه',
  },
  {
    accessorKey: 'price',
    header: 'قیمت',
  },
  {
    accessorKey: 'category',
    header: 'دسته‌بندی',
  },
  {
    accessorKey: 'size',
    header: 'سایز',
  },
  {
    accessorKey: 'color',
    header: 'رنگ',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
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
