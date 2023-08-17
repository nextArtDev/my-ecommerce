'use client'
import { Modal } from '@/components/modal'
import { StoreModal } from '@/components/modals/store-modal'
import { getAuthSession } from '@/lib/auth'
import { ModalProvider } from '@/providers/modal-providers'
import { onOpen } from '@/redux/slices/modalSlice'

import { useAppSelector } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { isOpen } = useAppSelector((state) => state.modalReducer)

  useEffect(() => {
    if (!isOpen) dispatch(onOpen())
  }, [dispatch, isOpen])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-4">{/* <ModalProvider /> */}</div>
    </main>
  )
}
