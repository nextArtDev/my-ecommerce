'use client'

import axios from 'axios'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadOneFile() {
  const [images, setImages] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  // const onDrop = useCallback(async (acceptedFiles: File[]) => {
  //   // const res = await axios.post('/api/uploads', acceptedFiles, {
  //   //   headers: { 'Content-Type': 'multipart/form-data' },
  //   // })
  //   // Do something with the files
  //   if (!acceptedFiles.length || !!acceptedFiles) return
  //   console.log(acceptedFiles)
  //   const res = await fetch('/api/uploads', {
  //     method: 'POST',
  //     body: acceptedFiles,
  //   })
  //   // acceptedFiles, {
  //   //   headers: { 'Content-Type': 'multipart/form-data' },
  //   console.log(res)
  // }, [])
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // async function uploadImages(ev: any) {
  //   const files = ev.target?.files
  //   if (files?.length > 0) {
  //     setIsUploading(true)
  //     console.log(files)
  //     const data = new FormData()
  //     console.log({ ...data })
  //     for (const file of files) {
  //       data.append('file', file)
  //       console.log(data)
  //     }
  //     // files.forEach((file: any) => {
  //     //   data.append('file', file)
  //     // })
  //     // const res = await axios.post('/api/uploads', data, {
  //     //   headers: { 'Content-Type': 'multipart/form-data' },
  //     // })

  //     const res = await fetch('/api/uploads', {
  //       method: 'POST',
  //       body: data,
  //     })

  //     // setImages((oldImages) => {
  //     //   return [...oldImages, ...res.data.links]
  //     // })
  //     setIsUploading(false)
  //   }
  // }
  // const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // const onFilesUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const fileInput = e.target

  //   if (!fileInput.files) {
  //     alert('No files were chosen')
  //     return
  //   }

  //   if (!fileInput.files || fileInput.files.length === 0) {
  //     alert('Files list is empty')
  //     return
  //   }

  //   /** Files validation */
  //   const validFiles: File[] = []
  //   for (let i = 0; i < fileInput.files.length; i++) {
  //     const file = fileInput.files[i]

  //     if (!file.type.startsWith('image')) {
  //       alert(`File with idx: ${i} is invalid`)
  //       continue
  //     }

  //     validFiles.push(file)
  //   }

  //   if (!validFiles.length) {
  //     alert('No valid files were chosen')
  //     return
  //   }

  //   /** Uploading files to the server */
  //   try {
  //     var formData = new FormData()
  //     validFiles.forEach((file) => formData.append('media', file))

  //     const res = await fetch('/api/uploads', {
  //       method: 'POST',
  //       body: formData,
  //     })

  //     const {
  //       data,
  //       error,
  //     }: {
  //       data: {
  //         url: string | string[]
  //       } | null
  //       error: string | null
  //     } = await res.json()

  //     if (error || !data) {
  //       alert(error || 'Sorry! something went wrong.')
  //       return
  //     }

  //     setPreviewUrls(
  //       validFiles.map((validFile) => URL.createObjectURL(validFile))
  //     )
  //     // we will use this to show the preview of the images

  //     /** Reset file input */
  //     fileInput.type = 'text'
  //     fileInput.type = 'file'

  //     console.log('Files were uploaded successfylly:', data)
  //   } catch (error) {
  //     console.error(error)
  //     alert('Sorry! something went wrong.')
  //   }
  // }

  async function uploadImages(ev: any) {
    const file = ev.target?.files[0]
    if (file?.length > 0) {
      console.log(file)
      setIsUploading(true)
      // const data = new FormData()
      var formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      })

      // for (const file of files) {
      //   data.append('file', file)
      // }
      // const res = await axios.post('/api/uploads', data)
      // setImages((oldImages) => {
      //   return [...oldImages, ...res.data.links]
      // })
      // setIsUploading(false)
    }
  }
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>Add image</div>
      <input type="file" onChange={uploadImages} multiple />
    </form>
    // <div
    //   className="mx-auto rounded-xl mt-8 flex flex-col justify-center items-center gap-6 border-[3px] border-dashed border-gray-500 bg-gray-200 w-52 h-52 cursor-pointer "
    //   {...getRootProps()}
    // >
    //   <input {...getInputProps()} />
    //   <ImagePlus size={40} className="mt-8 opacity-60  mx-auto" />
    //   {isDragActive ? (
    //     <p className="text-xs opacity-60 text-center">
    //       فایل را اینجا رها کنید...
    //     </p>
    //   ) : (
    //     <p className="text-xs px-4 opacity-60 text-center">
    //       برای انتخاب فایل کلیک کنید و یا فایل را بردارید و اینجا رها کنید.
    //     </p>
    //   )}
    // </div>
    // <form
    //   className="w-full p-3 border border-gray-500 border-dashed"
    //   onSubmit={(e) => e.preventDefault()}
    // >
    //   {previewUrls.length > 0 ? (
    //     <>
    //       <button
    //         onClick={() => setPreviewUrls([])}
    //         className="mb-3 text-sm font-medium text-gray-500 transition-colors duration-300 hover:text-gray-900"
    //       >
    //         Clear Previews
    //       </button>

    //       <div className="flex flex-wrap justify-start">
    //         {previewUrls.map((previewUrl, idx) => (
    //           <div key={idx} className="w-full p-1.5 md:w-1/2">
    //             <Image
    //               alt="file uploader preview"
    //               objectFit="cover"
    //               src={previewUrl}
    //               width={320}
    //               height={218}
    //               layout="responsive"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </>
    //   ) : (
    //     <label className="flex flex-col items-center justify-center h-full py-8 transition-colors duration-150 cursor-pointer hover:text-gray-600">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="w-14 h-14"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //         strokeWidth={2}
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    //         />
    //       </svg>
    //       <strong className="text-sm font-medium">Select images</strong>
    //       <input
    //         className="block w-0 h-0"
    //         name="file"
    //         type="file"
    //         onChange={onFilesUploadChange}
    //         multiple
    //       />
    //     </label>
    //   )}
    // </form>
  )
}

// import React, { useState } from 'react'

// type Props = {}

// function UploadOneFile({}: Props) {
//   const [file, setFile] = useState<File | undefined>()

//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault()
//     const target = e.target as HTMLInputElement & {
//       files: FileList
//     }
//     setFile(target.files[0])
//     console.log('file', file)
//   }
// const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault()
//   if (!file) return

//   try {
//     const data = new FormData()
//     data.set('file', file)

//     // axios.post('/api/uploads', data)
//     const res = await fetch('/api/uploads', {
//       method: 'POST',
//       body: data,
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

//   return (
//     <form>
//       <input type="file" name="file" onChange={handleOnChange} />
//       {/* <input type="submit" value="Upload" /> */}
//     </form>
//   )
// }

// export default UploadOneFile
