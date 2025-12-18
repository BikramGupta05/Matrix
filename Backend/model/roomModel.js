import mongoose from "mongoose"

const roomSchema= new mongoose.Schema({
    roomnumber:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["available","hold","booked"],
        required:true
    },
    roomHotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    }
},{timestamps:true})

const Room= mongoose.model("Room",roomSchema)
export default (Room)