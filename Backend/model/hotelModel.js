import mongoose from "mongoose";

const hotelschema=  new mongoose.Schema({
    hname:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    // enrolledRecep:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Recep"
    // }],
    // receps:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Recep"
    // }],
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Hotel=mongoose.model("Hotel",hotelschema)

export default (Hotel)