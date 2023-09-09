'use client'

import { Separator } from '@/components/ui/separator'

import { columns, OrderColumn } from './columns'
import { DataTable } from '@/components/DataTable'
import { Heading } from '@/components/Heading'

interface OrderClientProps {
  data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`سفارشات (${data.length})`}
        description="سفارشات فروشگاه را مدیریت کنید."
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  )
}
