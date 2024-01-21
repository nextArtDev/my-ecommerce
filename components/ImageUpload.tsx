'use client'

// import { CldUploadWidget } from 'next-cloudinary'
import { ChangeEvent, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'
import { uploadToS3 } from '@/lib/uploadToS3'
import { deleteFromS3 } from '@/lib/deleteFromS3'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[] //Number of images or if 'const files = Array.from(event.target.files!)' --> files
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value: formValue,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // const onUpload = (result: any) => {
  //   onChange(result.info.secure_url)
  // }
  const [urls, setUrls] = useState<string[]>([])

  const handleFilesChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files!)
    if (files.length < 1) return
    // console.log(files.length)

    for (let index = 0; index < files.length; index++) {
      const value = files[index]
      console.log(value)
      //@ts-ignore
      const url = await uploadToS3(value)
      onChange(url!)
      setUrls((current: any) => [...current, url])
    }
  }

  const onDelete = async (url: string) => {
    const res = await deleteFromS3(url)
    onRemove(url)
    // console.log(res)
  }

  //its place is important and it should be after onUpload to does not break it
  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {/* Iterating over Url of different image */}
        {urls.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onDelete(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        disabled={disabled}
        variant="secondary"
        onClick={() => (formValue = [...urls])}
      >
        <input
          // hidden
          type="file"
          name="file"
          multiple={true}
          onChange={handleFilesChange}
        />
        <ImagePlus className="h-4 w-4 mr-2" />
        {/* Upload an Image */}
      </Button>
    </div>
  )
}

export default ImageUpload
