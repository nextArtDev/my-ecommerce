import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { NextResponse } from 'next/server'
import { z } from 'zod'

const storeSchema = z.object({
  name: z.string().min(1, { message: 'نام فروشگاه باید بیش از یک حرف باشد.' }),
})

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    const userId = session?.user.id
    // console.log(userId)
    const body = await req.json()

    const { name } = storeSchema.parse(body)

    if (!userId) {
      return new NextResponse('احراز هویت نشده.', { status: 403 })
    }

    if (!name) {
      return new NextResponse('درج نام اجباری است.', { status: 400 })
    }

    const store = await prisma.store.create({
      data: {
        name,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORES_POST]', error)
    return new NextResponse('خطای داخلی.', { status: 500 })
  }
}
