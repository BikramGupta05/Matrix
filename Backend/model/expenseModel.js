import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    creatorHotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hotel"
    }
},{timestamps:true})

const Expense= mongoose.model("Expense",expenseSchema)
export default (Expense)