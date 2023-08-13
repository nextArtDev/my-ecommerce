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

const ActivationFormSchema = z.object({
  code: z.string(),
})

interface pageProps {
  phoneNumber: string
}

export function UserActivationForm({ phoneNumber: phone }: pageProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof ActivationFormSchema>>({
    resolver: zodResolver(ActivationFormSchema),
    defaultValues: {
      code: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof ActivationFormSchema>) {
    try {
      console.log('form data', data.code)
      // axios.post('/api/user', JSON.stringify(data))
      // router.push('/sign-in')

      const response = await axios.post(
        '/api/otp',
        JSON.stringify({
          verificationCode: Number(data.code),
          phoneNumber: phone,
        })
      )

      // console.log('form data, code', typeof data.code)
      // console.log('form data, phone ', Number(phone))
      router.push(`/`)

      // toast({
      //   title: 'You submitted the following values:',
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })

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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد فعالسازی </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="123456"
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
          عضویت
        </Button>
      </form>
    </Form>
  )
}
