import { authOptions, getAuthSession } from '@/lib/auth'
import Image from 'next/image'

export default async function Home() {
  const session = await getAuthSession()
  // console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3 className="bg-red-500 text-5xl">
        {' '}
        {session?.user.name || 'nothing'}
      </h3>
    </main>
  )
}
