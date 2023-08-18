import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'

// import Navbar from '@/components/navbar'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const session = await getAuthSession()
  const userId = session?.user.id

  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  })

  if (!store) {
    redirect('/')
  }

  return (
    <>
      {/* <Navbar /> */}
      {children}
    </>
  )
}
