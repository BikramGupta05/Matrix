import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum:["Recep","Owner"],
        required:true
    },
    photUrl:{
        type:String,
        default:""
    },
    enrolledrooms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotels"
    }],
    resetOtp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    isOtpVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)

export default (User)