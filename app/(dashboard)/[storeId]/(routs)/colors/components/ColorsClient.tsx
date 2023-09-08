'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { columns, ColorColumn } from './columns'
import { Heading } from '@/components/Heading'
import { DataTable } from '@/components/DataTable'
import { ApiList } from '@/components/ApiList'

interface ColorClientProps {
  data: ColorColumn[]
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`رنگها (${data.length})`}
          description="رنگ محصولات را مدیریت کنید."
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="فراخوانی API برای رنگها" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  )
}
