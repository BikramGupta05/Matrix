import Booking from "../model/bookingModel.js";
import Room from "../model/roomModel.js";
import RoomHistory from "../model/roomHistoryModel.js";

const getDatesBetween = (start, end) => {
  const dates = [];
  let current = new Date(start);

  while (current < new Date(end)) {
    dates.push(current.toISOString().split("T")[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

export const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      guestName,
      guestPhone,
      checkInDate,
      checkOutDate,
    } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    // 1️⃣ Create booking
    const booking = await Booking.create({
      hotelId: room.roomHotelId,
      roomId,
      roomNumber: room.roomnumber,
      guestName,
      guestPhone,
      checkInDate,
      checkOutDate,
      bookedBy: req.userId,
    });

    // 2️⃣ Create RoomHistory ONLY for booked dates
    const dates = getDatesBetween(checkInDate, checkOutDate);

    await RoomHistory.insertMany(
      dates.map(date => ({
        hotelId: room.roomHotelId,
        roomId,
        roomNumber: room.roomnumber,
        date,
        status: "booked",
        bookingId: booking._id,
      }))
    );


    return res.status(201).json({
      message: "Room booked successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
