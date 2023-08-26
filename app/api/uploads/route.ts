import multer from 'multer'

import S3 from 'aws-sdk/clients/s3'
import { v4 as uuid } from 'uuid'
import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import multiparty from 'multiparty'
import { NextApiRequest } from 'next'
import { PutAws } from '@/app/uploads/components/util'
import formidable from 'formidable'
import { AWSError } from 'aws-sdk'
const s3 = new S3({
  apiVersion: '2006-03-01',
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
})

export async function POST(req: NextRequest, res: NextResponse) {
  const f: any = await req.formData()
  const obj = Object.fromEntries(f)
  const fileObject = f.get('file')
  const b = await fileObject.arrayBuffer()
  const buff = Buffer.from(b)

  s3.putObject({
    Body: buff,
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: randomUUID(),
  })
  // const uploadUrl = await s3.getSignedUrl('putObject', s3)
  // console.log('uploadUrl', uploadUrl)
  return NextResponse.json({ msg: 'success' })

  // const form = new multiparty.Form()
  // const { fields, files } = await new Promise((resolve, reject) => {
  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject(err)
  //     resolve({ fields, files })
  //   })
  // })
  // console.log('length:', files.file.length)
  // PutAws(req, res, req.json())
  // return res.json({ success: 'ok' })
  // const { fields, files } = await new Promise((resolve, reject) => {
  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject(err)
  //     resolve({ fields, files })
  //   })
  // })
  //  console.log('length:', files.file.length)
  //   console.log(files.length)
  // form.parse(request, (err, fields, files) => {
  //   console.log(files.length)
  // })
  // console.log('length:', files.file.length)
  // const data = await request.formData()
  // const file: File | null = data.get('file') as unknown as File
  // if (!file) {
  //   return NextResponse.json({ success: false })
  // }
  // const bytes = await file.arrayBuffer()
  // const buffer = Buffer.from(bytes)
  // console.log(buffer)
  // const bytes = await acceptedFiles.arrayBuffer()
  // console.log(typeof bytes)
  // console.log(acceptedFiles)
  // const ex = (request.query.fileType as string).split('/')[1]
  // const rawParams = request.url.split('?')[1]
  // const ex = rawParams.split('%2F')[1]
  // const Key = `${randomUUID()}.${ex}`
  // const Key = `${randomUUID()}`
  // const s3Params = {
  //   Bucket: process.env.LIARA_BUCKET_NAME,
  //   Key: file,
  //   Expires: 60,
  //   // ContentType: `image/${ex}`,
  // }
  // const uploadUrl = await s3.getSignedUrl('getObject', s3Params)
  // console.log('uploadUrl', uploadUrl)
  // return NextResponse.json({ success: true, uploadUrl })
  // const uploadUrl = await s3.getSignedUrl('putObject', s3Params)
  // // we should use this url to make a post request
  // console.log('uploadUrl', uploadUrl)
  // return NextResponse.json({ success: true, uploadUrl, key: Key })
}
export const config = {
  api: { bodyParser: false },
}

// Ecommerce
// import multiparty from 'multiparty'
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import fs from 'fs'
// import mime from 'mime-types'
// import { mongooseConnect } from '@/lib/mongoose'
// import { isAdminRequest } from '@/pages/api/auth/[...nextauth]'
// const bucketName = 'dawid-next-ecommerce'

// export default async function handle(req, res) {
//   await mongooseConnect()
//   await isAdminRequest(req, res)

//   const form = new multiparty.Form()
//   const { fields, files } = await new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err)
//       resolve({ fields, files })
//     })
//   })
//   console.log('length:', files.file.length)
//   const client = new S3Client({
//     region: 'us-east-1',
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     },
//   })

//   const links = []
//   for (const file of files.file) {
//     const ext = file.originalFilename.split('.').pop()
//     const newFilename = Date.now() + '.' + ext
//     await client.send(
//       new PutObjectCommand({
//         Bucket: bucketName,
//         Key: newFilename,
//         Body: fs.readFileSync(file.path),
//         ACL: 'public-read',
//         ContentType: mime.lookup(file.path),
//       })
//     )
//     const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`
//     links.push(link)
//   }
//   return res.json({ links })
// }

// export const config = {
//   api: { bodyParser: false },
// }
