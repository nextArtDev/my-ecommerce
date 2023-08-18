## Password reset 
<https://www.smashingmagazine.com/2022/08/implementing-reset-password-feature-nextjs-dynamic-routes/>

<https://codevoweb.com/forgot-reset-password-in-reactjs-and-axios/>

**--> with prisma <https://codevoweb.com/crud-api-node-prisma-postgresql-reset-password/>

<https://dominicarrojado.com/posts/how-to-create-your-own-otp-input-in-react-and-typescript-with-tests-part-1/>

## Prisma for SQL 
in every change: npx prisma migrate dev --name init

## phone regix
^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$
 const regex = new RegExp("^09\\d{9}$");

## How define validation by ZOD in routes

first we define schema, then parse it by __.parse(body)__ to protect body
```typescript
const userSchema = z.object({
  name: z.string().min(2),

  phone: z.string().regex(new RegExp('^09\\d{9}$')),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
    const { phone } = userSchema.parse(body)
```

## How to validate by regex in zod
```typescript
      phone: z.string().regex(new RegExp('^09\\d{9}$')),
```

## payment 
<https://www.npmjs.com/package/zarinpal-pay>

<https://github.com/alitnk/monopay/>


<https://youtu.be/tpnjYy1SG08>

## celebrating library

<https://github.com/alampros/react-confetti#readme>


```typescript

//npm i react-confetti

import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

export default () => {
  const { width, height } = useWindowSize()
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}
```

another 
<https://www.npmjs.com/package/react-rewards>


## Redux toolkit

use cases:
```typescript


import { useAppSelector } from '@/redux/store'

import { toggleTheme } from '@/redux/slices/themeSlice'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppSelector((state) => state.themeReducer.theme)
  return (
    <div className="text-green-500 " onClick={() => dispatch(toggleTheme)}>
      {theme}
    </div>
  )
}
```

### How can initialize functions in React Toolkit

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  isOpen: boolean

}

const initialState: InitialState = {
  isOpen: false,

}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {},
})

export const { } = modalSlice.actions
export const modalReducer = modalSlice.reducer
```

### an example of using that for auth:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  isAuth:boolean
    username:string
    isModerator:boolean
}

type InitialState = {
  value: AuthState
}

const initialState: InitialState = { 
  value: {
    isAuth:false,
    username:'',
    isModerator:false
    } as AuthState
  } 

const themeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   logOut:()=>{
    return initialState
   },
   // we just want to send back username, so my type is just <string>, because we just send back string containing username 
   // we dont use state here, so it can be logIn:(_, action:PayloadAction<string>)
   logIn:(state, action:PayloadAction<string>)=>{
    return{
    value:{
      isAuth:true,
    username:action.payload,
    isModerator:false
    }
    }
   },
// we dont need anything to send from the components
// we dont need to return sth, because if we modify state, it would return modified version, we should return object with all properties(like above) or mutate the state
toggleModerator:(state)=>{
  state.value.isModerator = !state.value.isModerator
}
  },
})

export const { logIn , logOut ,toggleModerator } = auth.actions
export const authReducer = auth.reducer

```

using redux toolkit:

```typescript

<!-- 'use client' -->

import { useAppSelector } from '@/redux/store'

 import {  logIn , logOut,toggleModerator } from '@/redux/slices/themeSlice'
import { AppDispatch } from '@/redux/store'
 import { useDispatch } from 'react-redux'

export default function Home() {
   const dispatch = useDispatch<AppDispatch>()
   // how we get the amount of our state in redux store 
   // its useSelector that we modify that in store
  const username = useAppSelector((state) => state.authReducer.value.username)
  return <div className="text-green-500 " onClick={()=>dispatch(logIn(username))} >
  // how we get the amount of our state in redux store 
  {username}
  </div>
}
// another example
//   const isAuth = useAppSelector((state) => state.authReducer.value.isAuth)
//{isAuth && <p>Is Auth</p>}
  
```

## React video
<https://www.remotion.dev/>

## Learn React Query in 50 minutes

### Query:
_Getting data from somewhere_ **GET**


### Mutation:
_Changing some type of data_ **POST , PUT, DELETE**

## Standardize using Dialog Component
```typescript

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children
}) => {
  //if its not open, open it!
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return ( 
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
        //content of everything else in our modal
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

```

## getAuthSession()


```typescript
 const session = await getAuthSession()
   console.log(session)
 <h3 className="bg-red-500 text-5xl">
        {' '}
        {session?.user.name || 'nothing'} - {session?.user.id || 'nothing'}{' '}
        {session?.user.name || 'nothing'} - {session?.user.id || 'nothing'}
      </h3> 
```

## Modal Provider

we want to add modal to the layout of our app, we want this modal to be available through out our application, we dont care if weather we trigger it from the products page or the navigation bar or from a completely different rout organization. 
for that, we should create a provider, we create it in root of our app.

```typescript
"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}

```

## Hydration Error
when we want to add a _client component_ inside a _server component_ we have to ensure that they're not be any hydration errors, esp with modals, that can cause the synchronization between the server-side rendering and the client side rendering, for example the server does not have any modal open but the client will, and that's going to through a hydration error. 
we ensure until this lifecycle has run which is only sth happen in the client component , we return null, so in server-side rendering we return null, so there is no hydration error possible happening, after server-side we return components.


```typescript
"use client";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
//only happens in client component
  useEffect(() => {
    setIsMounted(true);
  }, []);
// return null if its server-side 

  if (!isMounted) {
    return null;
  }
//after this, we're in client
  return (
    <>
      <StoreModal />
    </>
  );
}

```
to use it, we should extract it, in layout and everywhere we want to use it.
layout.tsx
```typescript

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
            <ModalProvider />
            {children}
      </body>
    </html>
  )
}
```

and for example if we want to use it in page.tsx:


## Shadcn and React-hook-form

```typescript

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/stores', values)
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      //   toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return(

    <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    //Importing any item
                    <FormItem>
                      <FormLabel>نام</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="فروشگاه"
                          //its for onChange, onBlur, ref, name and so on
                          {...field}
                        />
                      </FormControl>
                      //For error message and other messages
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 gap-2 flex items-center justify-start w-full">
                // type submit means it would trigger onSubmit prop
                  <Button disabled={loading} type="submit">
                    ادامه دادن
                  </Button>
                  <Button
                    disabled={loading}
                    variant="outline"
                    // onClick={storeModal.onClose}
                    onClick={() => dispatch(onClose())}
                  >
                    صرف نظر
                  </Button>
                </div>
              </form>
            </Form>
  )
```

## Prisma in SQL

-npm i -D prisma

-npm i @prisma/client

-creating prisma lib folder for not instantly create prisma client

//initializing db file and schema folder
-npx prisma init

//sync app with schema
-npx prisma generate

//sync ad with schema
-npx prisma db push

//Resetting prisma
-npx prisma migrate reset
-npx prisma generate
-npx prisma db push

## Toast Provider (not a shadcn one!)

we first create a file:__toast-provider.tsx__ in provider file,

```typescript
"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return ( 
    <Toaster />
   );
};

```
then we add it to root of our app:

```typescript

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
            <ToastProvider />
            {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

```

## logedin users

```typescript
import { getAuthSession } from '@/lib/auth'


  const session = await getAuthSession()
  const userId = session?.user.id
```

## Complete refresh for redirect
```typescript

window.location.assign(`/${data.id}`)
```
