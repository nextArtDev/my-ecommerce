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
export const authOptions: NextAuthOptions = {
  //here, and first we want a list of providers. Provider is a specific way of authentication, CredentialsProvider is the one that the user should have 'username' and 'password' in order to sign up and sign in
  //Creating NEXTAUTH_SECRET : in terminal we write: $ openssl rand -base64 32
  //adapter is not neccessary, when ever so logs or register it reflected in prisma
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        //since the next-auth can create a default sign-in page, it uses label, type and placeholder attribute
        phone: {
          label: 'موبایل',
          type: 'text',
        },
        password: { label: 'رمز عبور', type: 'password' },
      },
      //most important part of the credentials provider; it would be called when user fill the signin form
      //where we get data from the db
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied.
        // we send a post request to backend api to check if the credentials is correct returns a user object, else through an error or (here) return null
        // here we use prisma for db and also then we create a login api which takes username and password and checks inside db if supplied credentials is correct and such a user exist and then returns basic information as a user object
        //After creating login api route to find and co,pare password of user we post data to it:
        const res = await fetch('http://localhost:3000/api/user', {
          //we make this request by post
          method: 'POST',
          //then we set headers
          headers: {
            'Content-Type': 'application/json',
          },
          //we send username and password from this credential object and api route does it works i.e. get them by request.json(), and try to find it by email: await prisma.user.findFirst({}) and if it exists compared hashed password
          body: JSON.stringify({
            phone: credentials?.phone,
            password: credentials?.password,
          }),
        })
        //api login route returns back  'new Response(JSON.stringify(result))' or "new Response(JSON.stringify(null))" if its ok, we return user, else null
        const user = await res.json()

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          // if its ok and user exists and matched with password, returned user null to the "session" of next-auth
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  //we can have 'session:' and 'pages' (for signIn, signOut and other pages).
  //these are fns to add access token to user session
  callbacks: {
    //first we combine token and user into one object and return from jwt
    async jwt({ token, user }) {
      return { ...token, ...user }
      // const dbUser = await prisma.user.findFirst({
      //   where: {
      //     email: token.email!,
      //   },
      // })
      // if (!dbUser) {
      //   token.id = user!.id
      //   return token
      // }
      // return {
      //   id: dbUser.id,
      //   role: dbUser.role,
      //   email: dbUser.email,
      //   name: dbUser.name,
      // }
    },
    // second we populate user with session and token
    //when a session is created what should happen?
    async session({ session, token }) {
      session.user = token as any
      //   session.user.role = token.role
      return session
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
  },

  //Here we can create our own sign-in or sign-up page:
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
}
export const getAuthSession = () => getServerSession(authOptions)
