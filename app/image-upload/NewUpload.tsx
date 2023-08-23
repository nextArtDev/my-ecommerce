'use client'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}

function NewUpload({}: Props) {
  const [file, setFile] = useState<File>()
  const [src, setSrc] = useState('')
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const body = new FormData()
      body.set('file', file)

      const { data } = await axios.post('/api/file-upload', body)
      const newUrl = data.uploadUrl.split('?')[0]
      setSrc(newUrl)
      console.log(newUrl)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value={'Upload'} />
        <Image src={src} alt="img" width={150} height={150} />
      </form>
    </div>
  )
}

export default NewUpload
