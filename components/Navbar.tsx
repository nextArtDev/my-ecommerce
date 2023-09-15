import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { MainNav } from './MainNav'
import StoreSwitcher from './StoreSwitcher'
import { ThemeToggle } from './ThemeToggle'
// import StoreSwitcher from '@/components/store-switcher'
// import { MainNav } from '@/components/main-nav'
// import { ThemeToggle } from '@/components/theme-toggle'

const Navbar = async () => {
  const session = await getAuthSession()
  const userId = session?.user.id

  if (!userId) {
    redirect('/sign-in')
  }
  //fetching all stores which this user owns
  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        {/* ml-auto push everything to the right */}
        <div className="mr-auto flex items-center text-right space-x-4">
          <ThemeToggle />
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
