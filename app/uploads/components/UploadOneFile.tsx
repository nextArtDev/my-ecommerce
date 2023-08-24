'use client'
import { ImagePlus } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadOneFile() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      className="mx-auto flex flex-col justify-center items-center border w-52 h-52 cursor-pointer "
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <ImagePlus size={40} className="mt-8 opacity-60  mx-auto" />
      {isDragActive ? (
        <p className="text-xs opacity-60 text-center">
          فایل را اینجا رها کنید...
        </p>
      ) : (
        <p className="text-xs opacity-60 text-center">
          برای انتخاب فایل کلیک کنید یا فایل را بردارید و اینجا رها کنید.
        </p>
      )}
    </div>
  )
}
