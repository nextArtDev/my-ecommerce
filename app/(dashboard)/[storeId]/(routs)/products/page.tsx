import { format } from 'date-fns-jalali'

import { formatter } from '@/lib/utils'

import { ProductsClient } from './components/ProductClient'
import { ProductColumn } from './components/columns'
import { prisma } from '@/lib/prisma'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    //we include them to access them like individual objects and for example we can show them in table
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    //Because its Decimal in prisma model, we have to convert it to number by "toNumber"
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'dd MMMM yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
