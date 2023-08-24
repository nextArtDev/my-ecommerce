# react dropzone
npm install --save react-dropzone

# Multer

npm i multer
## Uploading single file

multer is going to come with middleware that we can use,
multer has options that one of them is _dest_ , it means where or what folder do you want to upload the files on server, and the result would be a middleware:
const upload = multer({dest:"uploads/"})

from upload we can select if we want to pass a single file, and we should pass an argument, when a front-end sends us the file, what is going be the name of the _field_ that file is going to be attach to? 
upload.single("whatFrontEndNamesThis")
```typescript
//creating an upload middleware
const upload = multer({dest:"uploads/"})

//we are waiting the file with the "file" name from the front-end
app.post('/upload',upload.single("file"),(req,res)=>{
    res.json({status: 'success'})
})
```


