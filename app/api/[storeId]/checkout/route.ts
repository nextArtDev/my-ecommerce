import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

import { getPaymentDriver, Zarinpal } from 'monopay'

const driver = getPaymentDriver('zibal', {
  merchantId: 'zibal',
  // sandbox: true,
})

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
    // console.log('paymentInfo', paymentInfo.url)

    const session = await getAuthSession()
    const userId = session?.user.id

    const users = prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    })

    // What we get from frontend: `${process.env.NEXT_PUBLIC_API_URL}/checkout`,{productIds: items.map((item) => item.id),}

    const { productIds, totalPrice } = await req.json()

    if (!productIds || productIds.length === 0) {
      return new NextResponse('Product ids are required', { status: 400 })
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    })

    const order = await prisma.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    })

    // const line_items: any = []

    // products.forEach((product) => {
    //   line_items.push({
    //     quantity: 1,
    //     price_data: {
    //       // currency: 'USD',
    //       product_data: {
    //         name: product.name,
    //       },
    //       unit_amount: product.price.toNumber(),
    //     },
    //   })
    // })

    const paymentInfo = await driver.requestPayment({
      amount: +totalPrice,
      referenceId: order.id,
      callbackUrl: `${process.env.FRONTEND_URL}/cart`,
      description: 'Description about the transaction',
    })

    // console.log(paymentInfo.referenceId)
    return NextResponse.json(paymentInfo, { headers: corsHeaders })
  } catch (error) {
    console.log(error)
  }
}

export async function GET(
  req: Request,
  res: Response,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url)
    // const categoryId = searchParams.get('categoryId') || undefined

    const amount = searchParams.get('amount')
    const referenceId = searchParams.get('referenceId')

    console.log(amount)
    const receipt = await driver.verifyPayment(
      {
        amount: amount, // from database
        referenceId, // from database
      },
      { searchParams, ...req.body }
    )
    console.log('receipt', receipt)
    return NextResponse.json(receipt)
  } catch (error) {
    console.log(error)
  }
}
