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
