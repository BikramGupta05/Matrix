import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../model/userModel.js"


export const getCurrentUser =async (req,res) => {
    try {
        const user=await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not Found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`Get Current User error ${error}`})
    }
}

export const updateProfile = async (req,res) => {
    try {
        const userId = req.userId
        const {description,name}=req.body
        let photoUrl
        if(req.file){
            photoUrl= await uploadOnCloudinary(req.file.path)
        }
        const user= await User.findByIdAndUpdate(userId,{name,description,photoUrl})
        if(!user){
            return res.status(404).json({message:"User not Found"})
        }
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`Update profile error ${error}`})
    }
}

// getting hotels by their id
// export const getHotelRecep=async (req,res) => {
//     try {
//         const {hotelId}=req.params
//         let recep= await User.findById(hotelId)
//         if(!recep){
//             return res.status(400).json({message:"Recep  not found"})
//         }
//         return res.status(200).json(recep)
//     } catch (error) {
//         return res.status(500).json({message:`failed to get recep by id ${error}`})
//     }
// }

// export const getHotelRecep = async (req,res) => {
//     try {
//         const userId=req.userId
//         const hotels=await User.find({admin:userId})
//         if(!hotels){
//             return res.status(400).json({message:"Hotels not found"})
//         }
//         return res.status(200).json(hotels)
//     } catch (error) {
//         return res.status(500).json({message:`failed toget Amin Hotels${error}`})
//     }
// }