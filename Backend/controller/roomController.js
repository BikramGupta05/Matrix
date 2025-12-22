import mongoose from "mongoose";
import Room from "../model/roomModel.js";
import User from "../model/userModel.js";
import RoomHistory from "../model/roomHistoryModel.js";

/* =========================
   CREATE ROOM
========================= */
export const createroom = async (req, res) => {
  try {
    const { roomnumber, roomHotelId } = req.body;

    if (!roomnumber || !roomHotelId) {
      return res.status(400).json({ message: "Fill all the details" });
    }

    if (!mongoose.Types.ObjectId.isValid(roomHotelId)) {
      return res.status(400).json({ message: "Invalid hotel id" });
    }

    // Prevent duplicate room number in same hotel
    const exists = await Room.findOne({ roomnumber, roomHotelId });
    if (exists) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const room = await Room.create({
      roomnumber,
      roomHotelId,
      status: "available",
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ROOMS BY HOTEL ID
========================= */
export const getRoombyHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: "Invalid hotel id" });
    }

    const rooms = await Room.find({ roomHotelId: hotelId })
      .sort({ roomnumber: 1 });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ROOMS BY RECEPTIONIST
========================= */
export const getRoomsbyRecepId = async (req, res) => {
  try {
    const recep = await User.findById(req.userId);

    if (!recep || recep.role !== "Recep") {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!recep.recephotelId) {
      return res.status(400).json({ message: "Hotel not assigned" });
    }

    const rooms = await Room.find({
      roomHotelId: recep.recephotelId,
    }).sort({ roomnumber: 1 });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE ROOM STATUS
========================= */
export const updateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid room id" });
    }

    if (!["available", "onhold", "booked"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.status = status;
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ROOMS BY DATE (CORRECT)
========================= */
export const getRoomsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const recep = await User.findById(req.userId);

    if (!recep || !recep.recephotelId) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    // 1️⃣ Get all rooms of hotel
    const rooms = await Room.find({
      roomHotelId: recep.recephotelId,
    }).sort({ roomnumber: 1 });

    // 2️⃣ Get booking history for selected date
    const history = await RoomHistory.find({
      hotelId: recep.recephotelId,
      date,
    });

    // 3️⃣ Map history by roomId
    const historyMap = {};
    history.forEach(h => {
      historyMap[h.roomId.toString()] = h.status;
    });

    // 4️⃣ Override room status only if booked on that date
    const finalRooms = rooms.map(room => ({
      ...room.toObject(),
      status: historyMap[room._id.toString()] || room.status,
    }));

    res.status(200).json(finalRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
