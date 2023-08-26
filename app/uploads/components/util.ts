import mime from 'mime'

import { S3 } from 'aws-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

interface PutAwsTypes {
  request: NextRequest
  response: NextResponse
  files: File[]
}
const s3 = new S3({
  apiVersion: '2006-03-01',
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: `${process.env.LIARA_ACCESS_KEY}`,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

export async function PutAws({ request, response, files }: PutAwsTypes) {
  try {
    const links = []
    //@ts-ignore
    for (const file of files?.file) {
      const Key = `${randomUUID()}.${mime.lookup(file.path)}`
      const ext = file.originalFilename.split('.').pop()
      const newFilename = Date.now() + '.' + ext

      const s3Params = {
        Bucket: process.env.LIARA_BUCKET_NAME,
        Key,
        Expires: 60,
        ContentType: mime.lookup(file.path),
      }
      const uploadUrl = await s3.getSignedUrl('putObject', s3Params)
      const link = `https://${process.env.LIARA_BUCKET_NAME}.s3.amazonaws.com/${newFilename}`
      links.push(link)
    }
    return links
  } catch (error) {
    console.error('Error uploading image:', error)
  }
}
export const config = {
  api: { bodyParser: false },
}
