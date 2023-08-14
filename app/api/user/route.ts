import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import * as bcrypt from 'bcrypt'
// Define Zod Schema for input validation

const userSchema = z.object({
  name: z.string().min(2, {
    message: 'نام شما باید بیشتر از 2 کاراکتر باشد',
  }),
  //z.string().regex("^09\\d{9}$")
  //^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$
  phone: z.string().regex(new RegExp('^09\\d{9}$'), {
    message: 'شماره موبایل معتبر نیست.',
  }),
  password: z.string().min(6, {
    message: 'برای رمز عبور حداقل 6 کاراکتر الزامیست.',
  }),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { phone, name, password } = userSchema.parse(body)

    const existingUserByPhone = await prisma.user.findUnique({
      where: { phone },
    })
    if (existingUserByPhone) {
      return NextResponse.json(
        {
          user: null,
          message: 'کاربر با این شماره تلفن وجود دارد.',
        },
        { status: 403 }
      )
    }
    // } else if (existingUserByPhone && !existingUserByPhone.isVerified) {
    //   return NextResponse.json(
    //     {
    //       user: null,
    //       message: 'شما هنوز اکانت خود را از طریق اس‌ام‌اس فعال نکرده‌اید.',
    //     },
    //     { status: 401 }
    //   )
    // }
    const newUser = await prisma.user.create({
      data: {
        phone,
        name,
        password: await bcrypt.hash(password, 10),
      },
    })
    const { password: userPassword, ...rest } = newUser
    console.log(newUser)
    return NextResponse.json(
      {
        user: rest,
        message: 'کاربر با موفقیت ثبت نام شد.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: 'مشکلی پیش آمده. لطفا دوباره امتحان کنید.',
      },
      { status: 500 }
    )
  }
}
