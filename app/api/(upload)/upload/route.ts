// import { NextApiHandler, NextApiRequest } from 'next'
// import formidable from 'formidable'
// import path from 'path'
// import fs from 'fs/promises'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// const readFile = (
//   req: NextApiRequest,
//   saveLocally?: boolean
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const options: formidable.Options = {}
//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), '/public/images')
//     options.filename = (name, ext, path, form) => {
//       return Date.now().toString() + '_' + path.originalFilename
//     }
//   }
//   options.maxFileSize = 4000 * 1024 * 1024
//   const form = formidable(options)
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err)
//       resolve({ fields, files })
//     })
//   })
// }

// const handler: NextApiHandler = async (req, res) => {
//   try {
//     await fs.readdir(path.join(process.cwd() + '/public', '/images'))
//   } catch (error) {
//     await fs.mkdir(path.join(process.cwd() + '/public', '/images'))
//   }
//   await readFile(req, true)
//   res.json({ done: 'ok' })
// }

// export default handler

import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import PutObjectCommand from 'aws-sdk/clients/s3'
import { join } from 'path'
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

import nextConnect from 'next-connect'

// import { createRequestPresigner } from '@aws-sdk/s3-request-presigner'
export async function POST(request: NextRequest) {
  const data = await request.formData()
  console.log('serdata', data)

  const file: File | null = data.get('file') as unknown as File
  console.log('serdata', file)

  if (!file) {
    return NextResponse.json({ success: false })
  }
  const bytes = await file.arrayBuffer()

  const buffer = Buffer.from(bytes)
  console.log('serbuffer', bytes)

  //With the file data in the buffer, you can do whatever you want.
  //for this we'll just write it to the filesystem in a new location
  // const path = join(process.cwd(), '/public', '/images', file.name)

  // await writeFile(path, buffer)
  // console.log(`open this  ${path}`)

  const client = new S3Client({
    region: 'default',
    endpoint: `https://${process.env
      .LIARA_ENDPOINT!}.s3.amazonaws.com/businesslogos/${file.name}`,
    // `https://${s3Bucket}.s3.amazonaws.com/businesslogos/${fileName}`
    credentials: {
      accessKeyId: process.env.LIARA_ACCESS_KEY!,
      secretAccessKey: process.env.LIARA_SECRET_KEY!,
    },
  })

  const params = {
    Body: buffer,
    Bucket: process.env.LIARA_BUCKET_NAME!,
    Key: `${file.lastModified}`,
  }

  // async/await
  try {
    const response = await client.send(new PutObjectCommand(params))
    console.log(response)
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
  }

  ////////////////////////////

  // const config = {
  //   endpoint: process.env.LIARA_ENDPOINT!,
  //   accessKeyId: process.env.LIARA_ACCESS_KEY!,
  //   secretAccessKey: process.env.LIARA_SECRET_KEY!,
  //   region: 'default',
  // }

  // const s3 = new AWS.S3(config)

  // const upload = multer({
  //   storage: multerS3({
  //     s3,
  //     bucket: process.env.LIARA_BUCKET_NAME!,
  //     key: function (req, file, cb) {
  //       console.log(file)
  //       cb(null, file.originalname)
  //     },
  //   }),
  // })

  ////////////////////////////////////////

  // const s3 = new S3Client({
  //   region: 'default',
  //   credentials: {
  //     accessKeyId: process.env.LIARA_ACCESS_KEY!,
  //     secretAccessKey: process.env.LIARA_SECRET_KEY!,
  //   },
  // })
  // const upload = multer()

  // const handler = nextConnect()
  //   .use(upload.single('file'))
  //   .post(async (req, res) => {
  //     const file = req.file
  //     const key = Date.now().toString() + '-' + file.originalname

  //     const putParams = {
  //       Bucket: process.env.LIARA_BUCKET_NAME,
  //       Key: key,
  //       Body: buffer,
  //       ContentType: file.mimetype,
  //       ACL: 'public-read',
  //     }

  //     try {
  //       await s3.send(new PutObjectCommand(putParams))

  //       const signedUrl = await createRequestPresigner(s3)
  //       const url = signedUrl(putParams, { expiresIn: 60 * 60 * 1000 }) // 1 hour

  //       res.status(200).json({ url })
  //     } catch (error) {
  //       console.error(error)
  //       res.status(500).json({ error: 'Error uploading file to S3' })
  //     }
  //   })
}
