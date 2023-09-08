'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Trash } from 'lucide-react'
import { Size } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'

import { AlertModal } from '@/components/modals/alert-modal'
import { Heading } from '@/components/Heading'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  name: z.string().min(1, { message: 'نام نمی‌تواند خالی باشد.' }),
  value: z.string().min(1, { message: 'مقدار نمی‌تواند خالی باشد.' }),
})

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
  initialData: Size | null
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'ویرایش سایز' : 'ایجاد سایز'
  const description = initialData ? 'ویرایش سایز.' : 'اضافه کردن سایز جدید'
  const toastMessage = initialData ? 'سایز آپدیت شد.' : 'سایز ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  })

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
      toast({ title: toastMessage, variant: 'default' })
    } catch (error: any) {
      toast({ title: 'مشکلی پیش آمده.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
      toast({ title: 'سایز حذف شد.', variant: 'default' })
    } catch (error: any) {
      toast({
        title:
          'مطمئن شوید ابتدا همه محصولاتی که از این سایز استفاده می‌کنند را حذف کرده‌اید.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="نام سایز"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مقدار</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="مقدار سایز"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
