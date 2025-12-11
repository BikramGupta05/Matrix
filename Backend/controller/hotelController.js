import Hotel from "../model/hotelModel.js"


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
        return res.status(500).json({message:`failed toget Amin Hotels${error}`})
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
        const {hotelId}=req.params
        let hotel= await Hotel.findById(hotelId)
        if(!hotel){
            return res.status(400).json({message:"Hotel is not found"})
        }
        hotel= await Hotel.findByIdAndDelete(hotelId,{new:true}) 
        return res.status(200).json({message:"Hotel removed"})
    } catch (error) {
        return res.status(500).json({message:`failed to delete Hotel ${error}`})
    }
}