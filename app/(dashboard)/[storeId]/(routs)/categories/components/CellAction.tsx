'use client'

import axios from 'axios'
import { useState } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { useCategoryModal } from '@/hooks/use-category-modal'
import { AlertModal } from '@/components/modals/alert-modal'

import { CategoryColumn } from './columns'

interface CellActionProps {
  data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
      toast({
        title: 'بیلبورد حذف شد.',
        variant: 'default',
      })
      router.refresh()
    } catch (error) {
      toast({
        title:
          'مطمئن شوید ابتدا همه دسته‌بندی‌هایی که از این دسته‌بندی استفاده می‌کنند را حذف کرده‌اید.',
        variant: 'destructive',
      })
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast({ title: 'ID کپی شد', variant: 'default' })
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">بازکردن منو</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="ml-2 h-4 w-4" /> کپی کردن ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/categories/${data.id}`)
            }
          >
            <Edit className="ml-2 h-4 w-4" /> آپدیت
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="ml-2 h-4 w-4" /> حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
