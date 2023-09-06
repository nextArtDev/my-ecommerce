'use client'

import * as z from 'zod'
import axios, { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import { Store } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

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
import { toast } from '@/components/ui/use-toast'
import { Heading } from '@/components/Heading'
import { useMutation } from '@tanstack/react-query'
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { AlertModal } from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/api-alert'
import { useOrigin } from '@/hooks/use-origin'
// import { AlertModal } from '@/components/modals/alert-modal'
// import { ApiAlert } from '@/components/ui/api-alert'

const formSchema = z.object({
  name: z.string().min(2, { message: 'حداقل 2 کاراکتر برای نام الزامیست' }),
})

//just name type of form schema to not repeat it constantly
type SettingsFormValues = z.infer<typeof formSchema>

//this initial data will be inside editing form
interface SettingsFormProps {
  initialData: Store
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const { loginToast } = useCustomToasts()
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const [open, setOpen] = useState(false)
  //   const [loading, setLoading] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  //react - query
  const { mutate: saveSettings, isLoading } = useMutation({
    mutationFn: async ({ name }: z.infer<typeof formSchema>) => {
      const payload: z.infer<typeof formSchema> = { name }
      const { data } = await axios.patch(
        `/api/stores/${params.storeId}`,
        payload
      )
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          return loginToast()
        }
        if (err.response?.status === 400) {
          return toast({
            title: 'نام فروشگاه الزامیست',
            // description: '',
            variant: 'destructive',
          })
        }
      }

      return toast({
        title: 'مشکلی پیش آمده.',
        // description: '',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.refresh()
      return toast({
        title: 'فروشگاه با موفقیت آپدیت شد.',
        description: '',
        variant: 'default',
      })
    },
  })
  const onSubmit = async (data: SettingsFormValues) => {
    const payload: z.infer<typeof formSchema> = {
      name: data.name,
    }
    saveSettings(payload)
  }

  //onDelete React Query
  const { mutate: onDelete, isLoading: deleteLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/stores/${params.storeId}`)
      return data
    },
    onError: (err) => {
      setOpen(false)
      if (err instanceof AxiosError) {
        if (err.response?.status === 403) {
          return loginToast()
        }
        if (err.response?.status === 400) {
          return toast({
            title: 'نام فروشگاه الزامیست',
            // description: '',
            variant: 'destructive',
          })
        }
      }
      return toast({
        title: 'مطمئن شوید ابتدا همه محصولات و دسته‌بندی‌ها را حذف کرده‌اید.',
        //    description: '',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      setOpen(false)
      toast({
        title: 'فروشگاه حذف شد.',
        //    description: '',
        variant: 'default',
      })
      router.refresh()
      //if any store, go to the first one, else go to the root page,
      router.push('/')
    },
  })

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteLoading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title="تنظیمات فروشگاه"
          description="ویژگی‌های فروشگاه را مدیریت کنید."
        />
        <Button
          disabled={isLoading}
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="" />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="نام فروشگاه"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            ذخیره تغییرات
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params.storeId}`}
        // description={``}
      />
    </>
  )
}
