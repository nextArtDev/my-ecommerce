'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Trash } from 'lucide-react'
import { Color } from '@prisma/client'
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
import { toast } from '@/components/ui/use-toast'
import { Heading } from '@/components/Heading'

const formSchema = z.object({
  name: z.string().min(2, { message: 'نام باید بیش از دو کاراکتر باشد.' }),
  value: z
    .string()
    .min(4, { message: 'مقدار هگز رنگ نمیتواند کمتر از 4 کاراکتر باشد' })
    .max(9, { message: 'مقدار هگز رنگ نمیتواند بیش از 9 کاراکتر باشد' })
    .regex(/^#/, {
      message: 'عبارت باید یک مقدار هگز معتبر با علامت # باشد.',
    }),
})

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
  initialData: Color | null
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'ویرایش رنگ' : 'ایجاد رنگ'
  const description = initialData ? 'ویرایش رنگ.' : 'اضافه کردن رنگ جدید'
  const toastMessage = initialData ? 'رنگ آپدیت شد.' : 'رنگ ایجاد شد.'
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد'

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  })

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/colors`)
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
      router.refresh()
      router.push(`/${params.storeId}/colors`)
      toast({ title: 'رنگ حذف شد.', variant: 'default' })
    } catch (error: any) {
      toast({
        title:
          'مطمئن شوید ابتدا همه محصولاتی که از این رنگ استفاده می‌کنند را حذف کرده‌اید.',
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
                      placeholder="نام رنگ"
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="مقدار رنگ"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        // Showing color
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="mr-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
