const express=require('express')
const app=express();

require("dotenv").config();
const PORT=process.env.PORT ||3000 
 
app.use(express.json())
const fileupload=require("express-fileupload")
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

const db=require('./config/database')
db.connectWithDb();

const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect()

const upload=require("./routes/FileUpload")
app.use('/api/v1/upload',upload);
app.listen(PORT,(req,res)=>{
    console.log(`app is running ${PORT}`)
})
