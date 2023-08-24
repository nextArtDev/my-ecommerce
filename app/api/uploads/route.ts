import multer from 'multer'

import S3 from 'aws-sdk/clients/s3'
import { v4 as uuid } from 'uuid'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'

const s3 = new S3({
  apiVersion: '2006-03-01',
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

export async function POST(request: NextRequest, response: NextResponse) {
  const url = await request
  console.log('route api', url)
  try {
    // const ex = (request.query.fileType as string).split('/')[1]
    // const rawParams = request.url.split('?')[1]
    // const ex = rawParams.split('%2F')[1]
    // const Key = `${randomUUID()}.${ex}`
    // // const Key = `${randomUUID()}`
    // const s3Params = {
    //   Bucket: process.env.LIARA_BUCKET_NAME,
    //   Key,
    //   Expires: 60,
    //   ContentType: `image/${ex}`,
    // }
    // const uploadUrl = await s3.getSignedUrl('putObject', s3Params)
    // // we should use this url to make a post request
    // console.log('uploadUrl', uploadUrl)
    // return NextResponse.json({ success: true, uploadUrl, key: Key })
  } catch (error) {
    console.error('Error uploading image:', error)
    NextResponse.json({ message: 'Error uploading image' })
  }
}
