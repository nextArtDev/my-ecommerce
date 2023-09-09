'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { ProductColumn, columns } from './columns'
import { Heading } from '@/components/Heading'
import { DataTable } from '@/components/DataTable'
import { ApiList } from '@/components/ApiList'

interface ProductsClientProps {
  data: ProductColumn[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`محصولات (${data.length})`}
          description="محصولات فروشگاه را مدیریت کنید."
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="ml-2 h-4 w-4" /> اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="فراخوانی API برای محصولات." />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}
