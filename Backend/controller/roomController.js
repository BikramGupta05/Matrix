import mongoose from "mongoose";
import Room from "../model/roomModel.js";
import User from "../model/userModel.js";

export const createroom = async (req, res) => {
  try {
    const { roomnumber, status, roomHotelId } = req.body;

    // validation
    if (!roomnumber || !status || !roomHotelId) {
      return res.status(400).json({ message: "Fill all the details" });
    }

    if (!mongoose.Types.ObjectId.isValid(roomHotelId)) {
      return res.status(400).json({ message: "Invalid hotel id" });
    }

    const room = await Room.create({
      roomnumber,
      status,
      roomHotelId
    });

    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({
      message: `Room Creating error ${error.message}`,
    });
  }
};

export const getRoombyHotelId=async (req,res) => {
    try {
        const { hotelId } = req.params
        
            // optional: validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(hotelId)) {
              return res.status(400).json({ message: 'Invalid hotel id' })
            }
        
            // Find hotels whose hotelId matches
            const rooms = await Room.find({
              roomHotelId: hotelId
            })
        
            return res.status(200).json(rooms)
        
    } catch (error) {
        return res.status(500).json({message:`Extracting room from hotel id error ${error}`})
    }
}

export const getRoomsbyRecepId = async (req, res) => {
  try {
    //  Get receptionist
    const recep = await User.findById(req.userId);
    if (!recep) {
      return res.status(400).json({ message: "Invalid receptionist id" });
    }
    //  Optional role check (recommended)
    if (recep.role !== "Recep") {
      return res.status(403).json({ message: "Access denied" });
    }
    // Get hotel id
    const hotelId = recep.recephotelId;
    if (!hotelId) {
      return res.status(400).json({ message: "Hotel id not found for receptionist" });
    }
    // Fetch rooms
    const rooms = await Room.find({ roomHotelId: hotelId });
    return res.status(200).json(rooms);
   } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Error while fetching rooms by receptionist",});
  }
};

export const updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status } = req.body;

    if (!["available", "onhold"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const room = await Room.findByIdAndUpdate(
      roomId,
      { status },
      { new: true }
    );

    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: "Status update failed" });
  }
};


