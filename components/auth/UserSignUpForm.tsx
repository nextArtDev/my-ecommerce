'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'نام شما باید بیشتر از 2 کاراکتر باشد',
  }),
  //z.string().regex("^09\\d{9}$")
  //^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$
  phone: z
    .string()
    .regex(new RegExp('^09\\d{9}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'شماره موبایل معتبر نیست.',
    }),
})

export function UserSignUpForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data)
    // axios.post('/api/user', JSON.stringify(data))
    // router.push('/sign-in')
    axios.post(`/api/activation`, JSON.stringify(data))
    router.push(`/activation/${data.phone}`)

    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="text-white/50">
                نام و نام خانوادگی خود را وارد کنید.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره موبایل</FormLabel>
              <FormControl>
                <Input
                  placeholder="09130000000"
                  {...field}
                  className="placeholder:text-gray-400"
                />
              </FormControl>
              <FormDescription className="text-white/50">
                شماره شما نمایش داده نمی‌شود.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-blue-950 hover:bg-gray-gradient hover:text-blue-950 "
        >
          عضویت
        </Button>
      </form>
    </Form>
  )
}
