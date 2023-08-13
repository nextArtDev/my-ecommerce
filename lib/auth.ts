import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: {
          label: 'شماره تلفن',
          type: 'text',
          placeholder: '09130000000',
        },
      },
      async authorize(credentials, req) {
        const res = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const user = await res.json()

        // if (res.ok && user) {
        //   return user
        // }
        // return null
        const { phone } = user
        try {
          const user = await prisma.user.findUnique({
            where: {
              phone,
            },
          })
          if (!user) {
            return null
          }
          if (!user.isVerified) {
            return null
          }
          if (user) {
            return user
          }
        } catch (error) {}
      },
    }),
  ],
}
