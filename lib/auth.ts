// import { NextAuthOptions } from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import { prisma } from './prisma'

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/sign-in',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         phone: {
//           label: 'شماره تلفن',
//           type: 'text',
//           placeholder: '09130000000',
//         },
//       },
//       async authorize(credentials, req) {
//         const res = await fetch('/api/register', {
//           method: 'POST',
//           body: JSON.stringify(credentials),
//           headers: { 'Content-Type': 'application/json' },
//         })
//         const user = await res.json()

//         // if (res.ok && user) {
//         //   return user
//         // }
//         // return null
//         const { phone } = user
//         try {
//           const user = await prisma.user.findUnique({
//             where: {
//               phone,
//             },
//           })
//           if (!user) {
//             return null
//           }
//           if (!user.isVerified) {
//             return null
//           }
//           if (user) {
//             return user
//           }
//         } catch (error) {}
//       },
//     }),
//   ],
// }

import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import { compare } from 'bcrypt'
import { z } from 'zod'

const FormSchema = z.object({
  phone: z
    .string()
    .regex(new RegExp('^09\\d{9}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'شماره موبایل معتبر نیست.',
    }),
  password: z.string().min(8, {
    message: 'رمز عبور بیش از 7 کاراکتر است.',
  }),
})
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        // name: {
        //   label: 'موبایل',
        //   type: 'text',
        // },
        phone: {
          label: 'موبایل',
          type: 'text',
        },
        password: { label: 'رمز عبور', type: 'password' },
      },
      //this method returns null if user does not pass
      async authorize(credentials, req) {
        const { phone, password } = FormSchema.parse(credentials)

        if (!password || !credentials) {
          return null
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            phone: phone,
          },
        })
        console.log(existingUser)
        if (!existingUser) {
          return null
        }
        if (!existingUser.isVerified) {
          return null
        }
        const passwordMatch = await compare(password, existingUser.password)
        if (!passwordMatch) {
          return null
        }

        //   const res = await fetch('http://localhost:3000/api/user', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       phone: credentials?.phone,
        //       password: credentials?.password,
        //     }),
        //   })
        //   const user = await res.json()

        //   if (user) {
        //     return user
        //   } else {
        //     return null
        //   }
        return {
          id: `${existingUser.id}`,
          phone: existingUser.phone,
          name: existingUser.name,
          isVerified: existingUser.isVerified,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',

  //calls after some code runs
  callbacks: {
    // token:when ever the user tries to get the session, adding id to user, so we can access it on the front-end
    async session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.name

      return session
    },
    // when we append id to token by using session callback, we can append it to the user too
    async jwt({ token, account, user }) {
      // return { ...token, ...user }
      // const dbUser = await prisma.user.findFirst({
      //   where: {
      //     phone: token.phone!,
      //   },
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
        // token.name = user.name
        // token.isVerified = user.isVerified
      }
      return token
      // })
    },
    // if (!dbUser) {
    //   token.id = user!.id
    //   return token
    // }
    // return {
    //   id: dbUser.id,
    //   role: dbUser.role,
    //   phone: dbUser.phone,
    //   name: dbUser.name,
    // }
  },

  //FOR ROLE BASED
  // {
  //   jwt({ token, user }) {
  //   if(user) token.role = user.role
  //   return token
  // },
  // session({ session, token }) {
  //   session.user.role = token.role
  //   return session
  // }
  // }
  // },

  //Here we can create our own sign-in or sign-up page:
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
}
export const getAuthSession = () => getServerSession(authOptions)
