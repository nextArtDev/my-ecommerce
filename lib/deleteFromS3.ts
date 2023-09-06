import axios from 'axios'
import { ChangeEvent } from 'react'

// export async function uploadToS3(e: ChangeEvent<HTMLFormElement>) {
export async function deleteFromS3(url: string) {
  // const formData = new FormData(e.target)

  // //getting data by the name of that in the form
  // const file = formData.get('file')

  if (!url) {
    return null
  }
  //   const key = `https://mye-commerce.storage.iran.liara.space/${key}`
  const key = url.split('/').pop()
  console.log('Key From Del', key)
  //Getting a presigned url
  const res = await axios.delete(`/api/s3-upload?key=${key}`)
  console.log(res)

  return res
}
