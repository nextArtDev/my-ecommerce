import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2),
})

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession()
    const userId = session?.user.id
    const body = await req.json()

    const { name } = formSchema.parse(body)

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession()
    const userId = session?.user.id

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
