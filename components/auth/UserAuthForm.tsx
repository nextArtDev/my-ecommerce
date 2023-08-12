'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  phone: z
    .string()
    .regex(new RegExp('^09\\d{9}$'), {
      message: 'شماره موبایل معتبر نیست.',
    })
    .regex(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'), {
      message: 'شماره موبایل معتبر نیست.',
    }),
})

export function UserAuthForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      //we pass each provider we used
      signIn('credentials', {
        ...data,
        redirect: false,
      })
      router.push('/')
      //   axios.post('/api/login', JSON.stringify(data))
      // toast({
      //   title: 'You submitted the following values:',
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })
    } catch (error) {
      toast({
        title: 'شما هنوز ثبت نام نکرده‌اید',
        variant: 'destructive',
      })
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-blue-950 hover:bg-gray-gradient hover:text-blue-950 "
        >
          ورود
        </Button>
      </form>
    </Form>
  )
}
