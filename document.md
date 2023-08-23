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
## Upload Image
S3 : <https://www.npmjs.com/package/next-s3-upload>
<https://aws.amazon.com/blogs/mobile/add-storage-to-a-next-js-13-app-with-aws-amplify/>

<https://stackoverflow.com/questions/72663673/how-do-i-get-uploaded-image-in-next-js-and-save-it>

<https://selectfrom.dev/connecting-aws-s3-buckets-to-next-js-25e903621c70>

<https://upmostly.com/next-js/how-to-upload-a-file-to-s3-with-next-js>


**
<https://www.adamrichardson.dev/blog/next-js-image-upload-s3>


<https://www.mtechzilla.com/blogs/how-to-upload-images-and-videos-to-amazon-s3-with-next-js-and-aws-sdk-v3>

<https://stackoverflow.com/questions/76379368/how-can-i-upload-images-to-an-amazon-s3-bucket-using-next-js-13s-app-router-and>

<https://javascript.plainenglish.io/how-to-upload-a-file-to-aws-s3-using-next-js-b89482da7c64>

<https://awstip.com/face-detection-and-comparison-using-aws-and-next-js-42baf8e14bca>

<https://reacthustle.com/blog/how-to-create-react-multiple-file-upload-using-nextjs-and-typescript>

```typescript

//inside utils, next<12 multer
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import crypto from 'crypto';

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3({});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
});

export default upload;


//How to use it

import upload from 'src/utils/upload';



handler.use(upload.single('file'));
...


```
-------------------------------------------------------
```typescript
import nextConnect from "next-connect";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

let filename = uuidv4() + "-" + new Date().getTime();
const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads/profiles", // destination folder
        filename: (req, file, cb) => cb(null, getFileName(file)),
    }),
});

const getFileName = (file) => {
    filename +=
        "." +
        file.originalname.substring(
            file.originalname.lastIndexOf(".") + 1,
            file.originalname.length
        );
    return filename;
};

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.array("file")); // attribute name you are sending the file by 

apiRoute.post((req, res) => {
    res.status(200).json({ data: `/uploads/profiles/${filename}` }); // response
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
```
<https://reactjsexample.com/creating-a-multer-storage-engine-with-a-nextjs-placeholder/>
### Ethan upload
<https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/>

### another
<https://codersteps.com/articles/building-a-file-uploader-from-scratch-with-next-js-app-directory>

### another
<https://codesandbox.io/s/nextjs-simple-upload-file-to-server-thyb0?file=/pages/api/file.js>

<https://upmostly.com/next-js/how-to-upload-a-file-to-s3-with-next-js>
### ChatGPT

npm i formidable

frontend:

```typescript
import { useState } from 'react'
import axios from 'axios'

const FileUpload = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload', formData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  )
}

export default FileUpload
```

backend:
```typescript
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

interface DeleteImageResponse {
  success: boolean;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (error: any, fields: any, files: any) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }

        resolve({ fields, files });
      });
    });

    const file = files.file;

    // Save the file to the public/images folder
    const filePath = path.join(process.cwd(), 'public', 'images', file.name);

    await new Promise((resolve, reject) => {
      fs.rename(file.path, filePath, (error) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }

        resolve();
      });
    });

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

export const deleteImage = (imageName: string): DeleteImageResponse => {
  return new Promise((resolve, reject) => {
    // Delete the image from the public/images folder
    const filePath = path.join(process.cwd(), 'public', 'images', imageName);

    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(error);
        reject({ success: false });
        return;
      }

      resolve({ success: true });
    });
  });
};
```

## Pushing elements at one side in tailwind
ml-auto: push all elements to the right
mr-auto: push all elements to the left

## Creating main navbar with active states
first we define routes with _active_ prop status; i.e. they're active when _pathname === they're route_ , then in mapping over them we use this active prop to indicate them:
```typescript
{routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            //first classes for all,
            'text-sm font-medium transition-colors hover:text-primary',
            // then if route is active, do this!
            route.active
            
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
```
all code:
```typescript
'use client'

export function MainNav({
  className,
  ...props
  // type of className and props should be:React.HTMLAttributes<HTMLElement>
  //its not needed to pass props as a string and others
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()
// we can use `/${params.storeId}` because we use it inside <Navbar> component which is inside dynamic routes!
  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'وضعیت',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'بیلبوردها',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'دسته‌بندی‌ها',
      active: pathname === `/${params.storeId}/categories`,
    },

  ]

  return (
    <nav
      className={cn('flex items-center gap-4 lg:gap-6', className)}
      {...props}
    >
    //iterating over the routes
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
```

## Dynamic routes in nested components
we define <mainNav /> inside components folder, but it inherited params.storeId and we can use them, _because Navbar component inside dynamic routes use it_!

## React Query Zod and react-hook-form of shadcn -- Row

```typescript
const FaqComment: FC<FaqCommentProps> = ({}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const { loginToast } = useCustomToasts()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  const FormSchema = z.object({
    comment: z
      .string()
      .min(3, {
        message: 'قسمت درج دیدگاه نباید خالی باشد',
      })
      .max(280, {
        message: 'نظر شما نمیتواند بیشتر از 280 کاراکتر باشد.',
      }),
  })

  //inferring type of schema
  // we can destructure it too: const {register, handleSubmit, formState: { errors }}
  const form = useForm<z.infer<typeof FormSchema>>({
    //enforcing post validator client side
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: '',
    },
  })

  const { mutate: createPost,loading } = useMutation({
    mutationFn: async ({ comment }: z.infer<typeof FormSchema>) => {
      const payload: z.infer<typeof FormSchema> = { comment }
      const { data } = await axios.post('/api/faq/post/create', payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: 'مشکلی پیش آمده.',
        description: 'لطفا بعدا امتحان کنید.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.push(`${pathname}`)
      return toast({
        title: '',
        description: '',
        variant: 'default',
      })
    },
  })
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload: z.infer<typeof FormSchema> = {
      comment: data.comment,
    }
    createPost(payload)
  }

  if (!isMounted) {
    return null
  }
  return (
    <article className="flex flex-col items-center justify-center ">
      <Dialog>
        <DialogTrigger asChild className="">
          <Button className=" fixed bg-blue-950 hover:bg-gray-gradient hover:text-blue-950 left-[50%] -translate-x-1/2 bottom-0 w-[50%] max-w-xl p-8 mb-8 shadow-2xl z-50 ">
            ثبت نظر
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-red-gradient max-w-[95%] rounded-xl">
          <DialogHeader className="  flex items-center justify-center space-y-4">
            <DialogTitle className="text-blue-950">ثبت نظر </DialogTitle>
            <DialogDescription className="text-white/50">
              نظر یا پیشنهاد خود را بنویسد.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-12 text-center text-black/80 "
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="mx-auto">
                    <FormControl className="h-36">
                      <Input
                      disabled={isLoading}
                      placeholder="نام فروشگاه"
                      {...field}
                    />
                    </FormControl>
                    <FormDescription className="text-white/50">
                      دیدگاه شما در صفحه عمومی نمایش داده خواهد شد.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogTrigger asChild className="">
                <Button
                  type="submit"
                  className="bg-blue-950 w-full md:w-[50%] text-white "
                >
                  ارسال
                </Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </article>
  )
}

```

## How fill Edit form by my initial data by zod

firs we get them from dynamic page route
then set them as an initial data for react-hook-form

```typescript
//first getting data from dynamic parent
interface SettingsFormProps {
  initialData: Store
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
// then set them as an initial data for react-hook-form
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
```

## Getting id of product by the using of dynamic routes in api

in any handler function of dynamic api routes, second parameter is params, and we can extract dynamic id from that
```typescript
  export async function PATCH(req: Request,{ params }: { params: { storeId: string })
```

whole code:
```typescript

export async function PATCH(
  // the first parameter is request
  req: Request,
  // second parameter of any function of dynamic api route is params
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession()
    const userId = session?.user.id
    const body = await req.json()

    const { name } = body


```
----------------------

## Full Update api route 

```typescript
const formSchema = z.object({
  name: z.string().min(2),
})

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession()
    const userId = session?.user.id
    const body = await req.json()

    const { name } = formSchema.parse(body)

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const store = await prisma.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
```

-------

## Full Delete api route

```typescript

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getAuthSession()
    const userId = session?.user.id

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 })
    }

    const store = await prisma.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log('[STORE_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

```

## Creating a modal to fire when we want to delete store
in modal folder we create _alert/modal.tsx_
Each modal should have 4 states, open, close, loading and confirm.
we should set hydration error

```typescript
'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Modal } from '../modal'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title="آیا مطمئن هستید؟"
      description="این عملیات برگشت پذیر نیست!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 gap-4 space-x-8 flex items-center justify-start w-full">
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          ادامه
        </Button>
        <Button disabled={loading} variant="outline" onClick={onClose}>
          انصراف
        </Button>
      </div>
    </Modal>
  )
}
```

## Creating environment key

it would be very useful in front-end
we set sth to all the routes, public and private;

```typescript

//variant could be public or private
interface ApiAlertProps {
  title: string
  description: string
  variant: 'public' | 'admin'
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = 'public',
}) => {
  //How to copy code
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description)
    // toast.success('API Route copied to clipboard.');
    toast({
      title: 'API کپی شد',
      description: '',
      variant: 'default',
    })
  }

  return (
    <Alert dir="ltr">
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
      // How to write code, semantic code 
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="sm" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

```

### Record type definition by chatGPT

```js
Let's say we have the following type definitions:


type ApiAlertProps = {
  variant: 'public' | 'admin';
  message: string;
}

type BadgeProps = {
  variant: 'subtle' | 'solid';
  text: string;
}


ApiAlertProps['variant'] and BadgeProps['variant'] are both string literal types that can only be one of the specified values ('public', 'admin', 'subtle', or 'solid'). 

In the context of Record<ApiAlertProps['variant'], BadgeProps['variant']>, this means we are creating a new type that maps the values of ApiAlertProps['variant'] to the values of BadgeProps['variant']. 

For example, if we have an object with the key 'public' and value 'subtle', it would match the type Record<'public', 'subtle'>. Similarly, an object with the key 'admin' and value 'solid' would match the type Record<'admin', 'solid'>. 

Here's an example of how we could use this type:


const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  'public': 'subtle',
  'admin': 'solid'
};

function renderAlert(alertProps: ApiAlertProps) {
  const badgeVariant = variantMap[alertProps.variant];
  return (
    <Badge variant={badgeVariant} text={alertProps.message} />
  );
}


In this example, we're using variantMap to map the ApiAlertProps['variant'] value to a corresponding BadgeProps['variant'] value. We then pass this mapped value to the Badge component along with the alert message.
```

## Safely mechanism to access origin in nextjs

on the server the window object does not exist, 

```typescript
import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);

  //if window is not undefined and we have window.location.origin, return window.location.origin else return nothing
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

//hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return origin;
};

```

## Persian date picker and formatter

npm i persian-datepicker
<https://www.npmjs.com/package/persian-datepicker>

npm i persian-date
<https://www.npmjs.com/package/persian-date>

