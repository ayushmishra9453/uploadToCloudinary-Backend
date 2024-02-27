const mongoose=require('mongoose')
require('dotenv').config()
exports.connectWithDb=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("database connection successfull")
    })
    .catch((error)=>{
        console.log("connection issue")
        console.log(error)
    })
}