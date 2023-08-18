'use client'

import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useAppSelector } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { useDispatch } from 'react-redux'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
// import { useStoreModal } from '@/hooks/use-store-modal'
import { Button } from '@/components/ui/button'
import { Modal } from '../modal'
import { onClose } from '@/redux/slices/modalSlice'
import { useMutation } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { useCustomToasts } from '@/hooks/use-custom-toasts'

const formSchema = z.object({
  name: z.string().min(1, { message: 'نام فروشگاه باید بیش از یک حرف باشد.' }),
})

export const StoreModal = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isOpen } = useAppSelector((state) => state.modalReducer)
  //   const storeModal = useStoreModal()
  const router = useRouter()
  const { loginToast } = useCustomToasts()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  //React Query

  const { mutate: createStore, isLoading } = useMutation({
    mutationFn: async ({ name }: z.infer<typeof formSchema>) => {
      const payload: z.infer<typeof formSchema> = { name }
      const { data } = await axios.post('/api/stores', payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          return loginToast()
        }
      }
      return toast({
        title: 'مشکلی پیش آمده.',
        description: 'لطفا بعدا امتحان کنید.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      window.location.assign(`/${data.id}`)
      return toast({
        title: 'فروشگاه اضافه شد.',
        // description: 'از شما متشکریم که نظر خود را با ما در میان گذاشتید.',
        variant: 'default',
      })
    },
  })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload: z.infer<typeof formSchema> = {
      name: data.name,
    }
    createStore(payload)
  }

  return (
    <Modal
      title="ایجاد فروشگاه"
      description="فروشگاه جدیدی برای مدیریت محصولات و دسته‌بندی آنها ایجاد کنید."
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      //   isOpen={storeModal.isOpen}
      //   onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نام</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="فروشگاه"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 gap-2 flex items-center justify-start w-full">
                  <Button disabled={isLoading} type="submit">
                    ادامه دادن
                  </Button>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    // onClick={storeModal.onClose}
                    onClick={() => dispatch(onClose())}
                  >
                    صرف نظر
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
