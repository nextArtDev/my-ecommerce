import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()

    const existingUserByPhone = await prisma.user.findUnique({
      where: { phone },
    })
    if (existingUserByPhone) {
      return NextResponse.json(
        {
          user: null,
          message: 'کاربر با این شماره تلفن وجود دارد.',
        },
        { status: 409 }
      )
    }
    const newUser = await prisma.user.create({
      data: {
        phone,
      },
    })
    return NextResponse.json(phone)
  } catch (error) {}
}
