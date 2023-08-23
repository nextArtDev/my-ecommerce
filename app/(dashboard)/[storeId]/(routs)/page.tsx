import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LuCreditCard, LuDollarSign, LuPackage } from 'react-icons/lu'
// import { Overview } from '@/components/overview'
// import { Heading } from '@/components/ui/heading'
// import { getTotalRevenue } from '@/actions/get-total-revenue'
// import { getSalesCount } from '@/actions/get-sales-count'
// import { getGraphRevenue } from '@/actions/get-graph-revenue'
// import { getStockCount } from '@/actions/get-stock-count'
// import { formatter } from '@/lib/utils'

interface DashboardPageProps {
  params: {
    storeId: string
  }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  //   const totalRevenue = await getTotalRevenue(params.storeId)
  //   const graphRevenue = await getGraphRevenue(params.storeId)
  //   const salesCount = await getSalesCount(params.storeId)
  //   const stockCount = await getStockCount(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* <Heading title="Dashboard" description="Overview of your store" /> */}
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
              <LuDollarSign className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">کل درآمد</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {formatter.format(totalRevenue)} */}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              <LuCreditCard className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">فروخته شده</CardTitle>
              {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold">+{salesCount}</div> */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-col text-center gap-y-2 sm:gap-x-2 sm:text-right sm:flex-row items-center justify-evenly space-y-0 pb-2">
              <LuPackage className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                محصولات در انبار
              </CardTitle>
              {/* <Package className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              {/* <div className="text-2xl font-bold">{stockCount}</div> */}
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>وضعیت</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <Overview data={graphRevenue} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage