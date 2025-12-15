import Expense from "../model/expenseModel.js"
import Hotel from "../model/hotelModel.js"
import User from "../model/userModel.js"
import mongoose from "mongoose"

//for creating new hotel in admin panel
export const createHotel= async (req,res) => {
    try {
        const{hname,place}=req.body
        if(!hname ||!place){
            return res.status(400).json({message:"Name and Place is required"})
        }
        const hotel=await Hotel.create({
            hname,
            place,
            admin:req.userId
        })
        return res.status(201).json(hotel)
    } catch (error) {
        return res.status(500).json({message:`Create Hotel error ${error}`})
    }
}

//for getting all the hotels which the the admin has created
export const getAdminHotels = async (req,res) => {
    try {
        const userId=req.userId
        const hotels=await Hotel.find({admin:userId})
        if(!hotels){
            return res.status(400).json({message:"Hotels not found"})
        }
        return res.status(200).json(hotels)
    } catch (error) {
        return res.status(500).json({message:`failed toget Admin Hotels${error}`})
    }
}

//for editing hotel name

export const editHotel = async (req,res) => {
    try {
        const {hotelId}=req.params
        const {hname,place}=req.body
        let hotel= await Hotel.findById(hotelId)
        if(!hotel){
            return res.status(400).json({message:"Hotel is not found"})
        }
        const updateData={hname,place}
        hotel= await Hotel.findByIdAndUpdate(hotelId,updateData,{new:true}) 
        return res.status(200).json(hotel)
    } catch (error) {
        return res.status(500).json({message:`failed to edit Hotel name ${error}`})
    }
}


// getting hotels by their id
export const gethotelById=async (req,res) => {
    try {
        const {hotelId}=req.params
        let hotel= await Hotel.findById(hotelId)
        if(!hotel){
            return res.status(400).json({message:"Hotel is not found"})
        }
        return res.status(200).json(hotel)
    } catch (error) {
        return res.status(500).json({message:`failed to get course by id ${error}`})
    }
}

// for deleting the hotels
export const removeHotel= async (req,res) => {
    try {
        const { hotelId } = req.params

        // 1. Check if hotel exists
        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" })
        }

        // 2. Delete all receptionists/users of this hotel
        await User.deleteMany({ recephotelId: hotelId })

        // 3. Delete all expenses of this hotel
        await Expense.deleteMany({ creatorHotelId: hotelId })

        // 4. Delete the hotel
        await Hotel.findByIdAndDelete(hotelId)

        return res.status(200).json({ message: "Hotel removed successfully" })
    } catch (error) {
        return res.status(500).json({message:`failed to delete Hotel ${error}`})
    }
}

export const getHotelReceptionists = async (req, res) => {
  try {
    const { hotelId } = req.params

    // optional: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: 'Invalid hotel id' })
    }

    // Find users whose role is Recep and recephotelId matches
    const receptionists = await User.find({
      role: 'Recep',
      recephotelId: hotelId
    }).select('-password') // don't send password

    return res.status(200).json(receptionists)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}