import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { zarinpal } from '@/lib/zarinpal'
import { Zarinpal } from '@/types/zarinpal'
import { NextResponse } from 'next/server'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001' || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

//Before POST request we have to do option request, otherwise the CORS still wont work
export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get('origin')
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001' || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
      'Access-Control-Max-Age': '86400',
    },
  })
  return response
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const session = await getAuthSession()
  const userId = session?.user.id

  // const users = prisma.user.findUnique({
  //   where: {
  //     id: Number(userId),
  //   },
  // })

  // What we get from frontend: `${process.env.NEXT_PUBLIC_API_URL}/checkout`,{productIds: items.map((item) => item.id),}

  const { productIds } = await req.json()

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

  const line_items: Zarinpal[] = []
  const list = products.forEach((product) => {
    line_items.push({
      amount: product.price.toNumber(),
      callback_url: `${process.env.FRONTEND_URL}/cart`,
      // mobile: '',
      // email: session?.user?.email || undefined,
      // description: 'توضیحات تراکنش',
      order_id: order.id,
    })
  })
  const createpay = await zarinpal.create({
    amount: 4500000,
    callback_url: `${process.env.FRONTEND_URL}/cart`,
    // order_id: order.id,
  })

  // const createpay = await zarinpal.create({
  //   amount: 100000,
  //   callback_url: 'http://localhost:8080/callback',
  //   mobile: '09339993377',
  //   email: 'my@site.com',
  //   description: 'توضیحات تراکنش',
  //   order_id: '3010',
  // })

  return NextResponse.json(
    { ...createpay },
    {
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3001' || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
        'Access-Control-Max-Age': '86400',
      },
    }
  )
}
