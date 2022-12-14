const mongoose = require("mongoose")
const bycrpt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens:[
        {
            token:{
                type:"String",
                required:true,
            }
        }
    ]
})
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bycrpt.hash(this.password, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
try{
   let token = jwt.sign( {_id:this._id}, process.env.SECRET_KEY);
   this.tokens= this.tokens.concat({token:token});
   await this.save();
   return token;
}catch(err){
    console.log(err)
}
}
const User = mongoose.model('USER', userSchema);


module.exports = User;

// Password Hashing
