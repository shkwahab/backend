const mongoose=require("mongoose")

mongoose.connect(process.env.DB).then((req)=>{
    console.log("Database Connected Successfully");
}).catch((err)=>{
    console.log("err");
})
