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

an example of using that for auth:

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