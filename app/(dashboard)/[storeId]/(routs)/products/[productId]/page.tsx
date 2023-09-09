import { prisma } from '@/lib/prisma'
import { ProductForm } from './components/product-form'

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string }
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    //Because array of images is separate model we have to include it, because we want row of url's not array of id's
    include: {
      images: true,
    },
  })

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  )
}

export default ProductPage
