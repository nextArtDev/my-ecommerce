'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
// import { DataTable } from "@/components/ui/data-table";

// import { ApiList } from "@/components/ui/api-list";
import { Separator } from '@/components/ui/separator'

import { columns, BillboardColumn } from './columns'
import { Heading } from '@/components/Heading'

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`بیلبوردها (${data.length})`}
          description="بیلبوردهای فروشگاه خود را مدیریت کنید."
        />
        <Button
          //we use "new" here to create it, and any other id of billboards to update or delete an existing one
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          اضافه کردن <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      <Heading title="API" description="فراخوانی API برای بیلبورد." />
      <Separator />
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </>
  )
}
