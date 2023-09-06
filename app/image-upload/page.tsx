import React from 'react'
import ImageUpload from './ImageUpload'
import NewUpload from './NewUpload'
import UploadImagesByS3Next from './S3-next-upload'

function page() {
  return (
    <div>
      {/* <ImageUpload />
      <NewUpload /> */}
      <UploadImagesByS3Next />
    </div>
  )
}

export default page
