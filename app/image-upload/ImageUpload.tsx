'use client'
import axios from 'axios'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
// import { GetServerSideProps, NextPage } from 'next'
// import { useState } from 'react'
// import axios from 'axios'
// import * as fs from 'node:fs'
// import path from 'path'
// import Link from 'next/link'

// interface Props {
//   dirs: string[]
// }

// const Home: NextPage<Props> = ({ dirs }) => {
//   const [uploading, setUploading] = useState(false)
//   const [selectedImage, setSelectedImage] = useState('')
//   const [selectedFile, setSelectedFile] = useState<File>()

//   const handleUpload = async () => {
//     setUploading(true)
//     try {
//       if (!selectedFile) return
//       const formData = new FormData()
//       formData.append('myImage', selectedFile)
//       const { data } = await axios.post('/api/upload-image', formData)
//       console.log(data)
//     } catch (error: any) {
//       console.log(error.response?.data)
//     }
//     setUploading(false)
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-20 space-y-6">
//       <label>
//         <input
//           type="file"
//           hidden
//           onChange={({ target }) => {
//             if (target.files) {
//               const file = target.files[0]
//               setSelectedImage(URL.createObjectURL(file))
//               setSelectedFile(file)
//             }
//           }}
//         />
//         <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
//           {selectedImage ? (
//             <img src={selectedImage} alt="" />
//           ) : (
//             <span>Select Image</span>
//           )}
//         </div>
//       </label>
//       <button
//         onClick={handleUpload}
//         disabled={uploading}
//         style={{ opacity: uploading ? '.5' : '1' }}
//         className="bg-red-600 p-3 w-32 text-center rounded text-white"
//       >
//         {uploading ? 'Uploading..' : 'Upload'}
//       </button>
//       <div className="mt-20 flex flex-col space-y-3">
//         {dirs.map((item) => (
//           <Link key={item} href={'/images/' + item}>
//             <a className="text-blue-500 hover:underline">{item}</a>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }
// export const getServerSideProps: GetServerSideProps = async () => {
//   const props = { dirs: [] }
//   try {
//     const dirs = await fs.createReadStream(
//       path.join(process.cwd(), '/public/images')
//     )
//     props.dirs = dirs as any
//     return { props }
//   } catch (error) {
//     return { props }
//   }
// }

// export default Home

//Handling Upload to S3
async function uploadToS3(e: ChangeEvent<HTMLFormElement>) {
  const formData = new FormData(e.target)

  //getting data by the name of that in the form
  const file = formData.get('file')

  if (!file) {
    return null
  }

  // @ts-ignore
  const fileType = encodeURIComponent(file.type)
  //we want filetype to attach our extension to our content type, because for put request we need to map signature to assigned url

  //Getting a presigned url
  const { data } = await axios.get(`/api/s3-upload?fileType=${fileType}`)

  const { uploadUrl, key } = data

  //we make a put request by a upload url
  const res = await axios.put(uploadUrl, file)
  console.log(key)

  return data
}

function ImageUpload() {
  const [src, setSrc] = useState<string[]>([])
  async function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = await uploadToS3(e)
    const newUrl = data.uploadUrl.split('?')[0]
    console.log(newUrl)
    setSrc((prev) => [...prev, newUrl])
  }

  return (
    <>
      <p>Please select file to upload</p>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/jpeg image/png" name="file" />
        <button type="submit">Upload</button>
      </form>
      {src?.map((sr, i) => (
        <Image key={i} src={sr} width={150} height={150} alt="image" />
      ))}
    </>
  )
}

export default ImageUpload
// import React, { useState } from 'react'

// type Props = {}

// function ImageUpload({}: Props) {
//   const [file, setFile] = useState<File>()

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!file) return

//     try {
//       const data = new FormData()
//       console.log('data', data)
//       data.set('file', file)

//       const { data: res } = await axios.post('/api/s3-upload', data)
//       //error
//       console.log('res', res)
//       if (!res.ok) throw new Error(await res.text())
//     } catch (error) {
//       console.error(e)
//     }
//   }
//   return (
//     <section>
//       <form onSubmit={onSubmit}>
//         <input
//           type="file"
//           name="file"
//           onChange={(e) => setFile(e.target.files?.[0])}
//         />
//         <button type="submit" value="Upload">
//           upload
//         </button>
//       </form>
//     </section>
//   )
// }
