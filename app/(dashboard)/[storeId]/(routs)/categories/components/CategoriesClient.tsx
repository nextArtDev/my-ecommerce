'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { Separator } from '@/components/ui/separator'

import { columns, CategoryColumn } from './columns'
import { Heading } from '@/components/Heading'
import { DataTable } from '@/components/DataTable'
import { ApiList } from '@/components/ApiList'

interface CategoriesClientProps {
  data: CategoryColumn[]
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`دسته‌بندی‌ها (${data.length})`}
          description="دسته‌بندی‌های فروشگاه را مدیریت کنید."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="فراخوانی API برای دسته‌بندی‌ها" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  )
}
