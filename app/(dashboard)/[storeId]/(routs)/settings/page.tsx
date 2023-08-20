import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { getAuthSession } from '@/lib/auth'
import { SettingsForm } from './components/SettingForm'

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
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
  //user can write whatever want, so redirect it back if its not a related store
  if (!store) {
    redirect('/')
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  )
}

export default SettingsPage
