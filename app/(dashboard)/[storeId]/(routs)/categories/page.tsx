import { format } from 'date-fns-jalali'

import { CategoryColumn } from './components/columns'
import { CategoriesClient } from './components/CategoriesClient'
import { prisma } from '@/lib/prisma'

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    //populating billboards with categories
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'dd MMMM yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  )
}

export default CategoriesPage
