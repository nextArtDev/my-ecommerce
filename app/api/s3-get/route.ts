import S3 from 'aws-sdk/clients/s3'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import qs from 'qs'

// async function uploadImageToS3(
//   file: Buffer,
//   fileName: string
// ): Promise<string> {
//   const resizedImageBuffer = await sharp(file)
//     .resize(400, 500) // Specify your desired width or height for resizing
//     .toBuffer()

//   const params = {
//     Bucket: process.env.LIARA_BUCKET_NAME as string,
//     Key: `${Date.now()}-${fileName}`,
//     Body: resizedImageBuffer,
//     ContentType: 'image/jpeg', // Change the content type accordingly
//   }

//   const command = new PutObjectCommand(params)
//   await s3Client.send(command)

//   return fileName
// }

const s3 = new S3({
  apiVersion: '2006-03-01',
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // const ex = (request.query.fileType as string).split('/')[1]
    // console.log(await request.json())
    const body = await request.json()
    // console.log(body)

    const s3Params = {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: body,
    }

    const uploadUrl = await s3.getSignedUrl('getObject', s3Params)

    // we should use this url to make a post request
    console.log('uploadUrl', uploadUrl)

    return NextResponse.json({ uploadUrl })
  } catch (error) {
    console.error('Error uploading image:', error)
    NextResponse.json({ message: 'Error uploading image' })
  }
}
