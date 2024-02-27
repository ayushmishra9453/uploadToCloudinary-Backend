const File=require("../model/File")
const cloudinary=require("cloudinary").v2
exports.localFileUpload= async (req,res)=>{
    try{
    //   fetch file
    console.log("hello")
    const file=req.files.file;
    console.log("file aa gayi hai",file);

    let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`; 
    console.log(path);
    file.mv(path,(err)=>{
        console.log(err);
    });
    res.json({
        success:true,
        message:"Local file uploaded successfully"
    })
    }
    catch(error){
     console.log(error);
     console.log("error on localfileUpload");
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file,folder,quality){
    const options={folder}
    if(quality){
        options.quality=quality
    }
    options.resource_type= "auto";
  return await cloudinary.uploader.upload(file.tempFilePath,options) 
}
// image upload ka handler

exports.imageUpload =async (req,res)=>{
    try{
        // data fetch 
        const {name,tags,email}=req.body;
         console.log(name,tags,email);

         const file=req.files.imageFile;
         console.log(File);

        //  Validation
        const supportedTypes=['jpg','jpeg','png']
        const fileType=file.name.split('.')[1].toLowerCase()
           console.log(fileType)
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }

        // file format supported hai 
          
        const response=await uploadFileToCloudinary(file,"ayushMishra")
        // console.log("hello")
          console.log(response)

        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        }) 

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
     catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}

// video upload ka handler

exports.videoUpload=async (req,res)=>{
    try{
     const {name,tags,email}=req.body;
     console.log(name,tags,email);

     const file=req.files.videoFile;

     const supportedTypes=['mp4','mov']
     const fileType=file.name.split('.')[1].toLowerCase()
        console.log(fileType)

        // add a upper limit 5MB to upload to upload a video
     if(!isFileTypeSupported(fileType,supportedTypes)){
         return res.status(400).json({
             success:false,
             message:'File format not supported'
         })
     }

     const response=await uploadFileToCloudinary(file,"ayushMishra")
     // console.log("hello")
       console.log(response)

       const fileData=await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
    }) 

    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'video Successfully Uploaded',
    })

    }
    catch(error){
        console.log(error)
        res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
}
// imageReducer
exports.imageSizeReducer=async(req,res)=>{
try{
    const {name,tags,email}=req.body;
    console.log(name,tags,email);

    const file=req.files.imageFile;
    console.log(File);

   //  Validation
   const supportedTypes=['jpg','jpeg','png']
   const fileType=file.name.split('.')[1].toLowerCase()
      console.log(fileType)
   if(!isFileTypeSupported(fileType,supportedTypes)){
       return res.status(400).json({
           success:false,
           message:'File format not supported'
       })
   }

   // file format supported hai 
     
   const response=await uploadFileToCloudinary(file,"ayushMishra",90)
   // console.log("hello")
     console.log(response)

   const fileData=await File.create({
       name,
       tags,
       email,
       imageUrl:response.secure_url,
   }) 

   res.json({
       success:true,
       imageUrl:response.secure_url,
       message:'Image Successfully Uploaded',
   })
}
catch(error){
    console.log(error);
    res.status(400).json({
        success:false,
        message:"something went wrong",
    })
}
}