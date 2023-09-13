import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
// import { zarinpal } from '@/lib/zarinpal'
// import { ZarinpalType } from '@/types/zarinpal'
// import Zarinpal from 'zarinpal-checkout-v4'
import { NextResponse } from 'next/server'
import { InitParams } from 'zarinpal-checkout-v4/lib/types/InitParams'
// import ZarinpalPayment from 'zarinpal-pay'
// // const zarinpal = new ZarinpalPayment(Merchant, isTomam, isSandbox)

// import { PaymentMetadata, PaymentRequest } from 'zarinpal-checkout-v4/lib/types'
import { getPaymentDriver } from 'monopay'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001' || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

//Before POST request we have to do option request, otherwise the CORS still wont work
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const initParams: InitParams = {
      merchantId: process.env.ZARINPAL_KEY!,
      callbackURL: `${process.env.FRONTEND_URL}/cart`,
      sandbox: true,
    }
    // const zarinpalV4 = Zarinpal.CreateInstance(initParams)

    const session = await getAuthSession()
    const userId = session?.user.id

    // const users = prisma.user.findUnique({
    //   where: {
    //     id: Number(userId),
    //   },
    // })

    // What we get from frontend: `${process.env.NEXT_PUBLIC_API_URL}/checkout`,{productIds: items.map((item) => item.id),}

    // const zarinpalPay = new ZarinpalPayment(
    //   process.env.ZARINPAL_KEY!,
    //   true,
    //   true
    // )
    // const { productIds } = await req.json()

    // if (!productIds || productIds.length === 0) {
    //   return new NextResponse('Product ids are required', { status: 400 })
    // }

    // const products = await prisma.product.findMany({
    //   where: {
    //     id: {
    //       in: productIds,
    //     },
    //   },
    // })

    // const order = await prisma.order.create({
    //   data: {
    //     storeId: params.storeId,
    //     isPaid: false,
    //     orderItems: {
    //       create: productIds.map((productId: string) => ({
    //         product: {
    //           connect: {
    //             id: productId,
    //           },
    //         },
    //       })),
    //     },
    //   },
    // })

    // const line_items: ZarinpalType[] = []
    // const list = products.forEach((product) => {
    //   line_items.push({
    //     amount: product.price.toNumber(),
    //     callback_url: `${process.env.FRONTEND_URL}/cart`,
    //     // mobile: '',
    //     // email: session?.user?.email || undefined,
    //     // description: 'توضیحات تراکنش',
    //     order_id: order.id,
    //   })
    // })
    // const res = await zarinpalPay.create({
    //   amount: 4500000,

    //   callback_url: `${process.env.FRONTEND_URL}/cart`,
    //   // order_id: order.id,
    //   description: 'payment',
    // })

    // console.log(res)

    // const createpay = await zarinpal.create({
    //   amount: 100000,
    //   callback_url: `${process.env.FRONTEND_URL}/cart`,
    //   mobile: '09352310831',
    //   email: 'my@site.com',
    //   description: 'توضیحات تراکنش',
    //   // order_id: order.id,
    // })

    // const pay: PaymentRequest = {
    //   amount: 1000,
    //   callback_url: `${process.env.FRONTEND_URL}/cart`,
    //   description: 'Test Payment',
    //   currency: 'IRT',
    //   metadata: {
    //     email: 'a@b.com',
    //     mobile: '09999999999',
    //     order_id: '123',
    //   } as PaymentMetadata,
    // }
    // const res = await zarinpalV4.requestPayment(pay)
    // console.log(res)

    // const response = await zarinpal.verifyPayment(res)

    const driver = getPaymentDriver('zarinpal', {
      merchantId: process.env.ZARINPAL_KEY!,
      sandbox: true,
    })
    const paymentInfo = await driver.requestPayment({
      amount: 50000,
      callbackUrl: `${process.env.FRONTEND_URL}/cart`,
      description: 'Description about the transaction',
    })
    return NextResponse.json(
      `<html>
    <body>
        <h1> We're redirecting you to the payment gateway... </h1>
        <script>${paymentInfo.getScript()}</script>
    </body>
    </html>`
    )
  } catch (error) {
    console.log(error)
  }
}
