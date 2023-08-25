# FormData object 

### from doc 
<https://javascript.info/formdata>

FormData objects are used to capture HTML form and submit it using fetch or another network method.

We can either create new FormData(form) from an HTML form, or create an object without a form at all, and then append fields with methods:

    formData.append(name, value)
    formData.append(name, blob, fileName)
    formData.set(name, value)
    formData.set(name, blob, fileName)

Let’s note two peculiarities here:

    The set method removes fields with the same name, append doesn’t. That’s the only difference between them.
    __To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for <input type="file">.__

Other methods are:

    formData.delete(name)
    formData.get(name)
    formData.has(name)

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


