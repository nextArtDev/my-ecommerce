'use client'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { ImagePlus } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadFile() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()

      //getting data by the name of that in the form

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)

        try {
          await axios.post(
            `/api/s3-upload`,
            { file },
            {
              //   headers: { 'Content-Type': 'multipart/from-data' },
            }
          )
        } catch (error) {}
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="flex justify-center items-center">
      <div
        className="w-2/3 h-40 gap-6 border-[3px] border-dashed border-gray-500 bg-gray-200 rounded-md cursor-pointer "
        placeholder="فایل را اینجا رها کنید یا با کلیک انتخاب کنید."
      >
        <input {...getInputProps()} />
        <ImagePlus size={40} className="mt-8 opacity-60  mx-auto" />
        <p className="text-sm py-4 text-center opacity-75 ">
          فایل را اینجا رها کنید یا با کلیک انتخاب کنید.
        </p>
      </div>
    </div>
  )
}
