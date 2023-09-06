'use client'

import { uploadToS3 } from '@/lib/uploadToS3'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export default function UploadImagesByS3Next() {
  const [urls, setUrls] = useState<string[]>([])

  const handleFilesChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!)
    if (files.length < 1) return
    console.log(files.length)

    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      console.log(file)
      //   @ts-ignore
      const url = await uploadToS3(file)

      setUrls((current: any) => [...current, url])
    }
  }

  return (
    <div>
      <input
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
      />

      <div>
        {urls.map((url, index) => (
          <Image key={url} src={url} width={120} height={120} alt="image" />
        ))}
      </div>
    </div>
  )
}
