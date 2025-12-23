import Booking from "../model/bookingModel.js";
import Room from "../model/roomModel.js";
import RoomHistory from "../model/roomHistoryModel.js";
import User from "../model/userModel.js";

/**
 * ✅ HOTEL-CORRECT DATE GENERATOR
 * - Includes check-in day
 * - Excludes checkout day
 * - IST safe (NO UTC shift)
 * - Returns ["YYYY-MM-DD"]
 */
const getBookedDates = (checkIn, checkOut) => {
  const dates = [];

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  // normalize to local calendar date
  let current = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const checkoutDate = new Date(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  while (current < checkoutDate) {
    // ✅ FORCE LOCAL DATE STRING (IST SAFE)
    const localDate = current.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    }); // YYYY-MM-DD

    dates.push(localDate);
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
      checkInDateTime,
      checkOutDateTime,
    } = req.body;

    const now = new Date();
    const checkIn = new Date(checkInDateTime);
    const checkOut = new Date(checkOutDateTime);

    // ❌ Past booking not allowed
    if (checkIn < now) {
      return res.status(400).json({
        message: "Past booking not allowed",
      });
    }

    // ❌ Invalid checkout
    if (checkOut <= checkIn) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    // ❌ Prevent overlapping bookings (TIME-BASED)
    const overlapping = await Booking.findOne({
      roomId,
      status: "active",
      checkInDateTime: { $lt: checkOut },
      checkOutDateTime: { $gt: checkIn },
    });

    if (overlapping) {
      return res.status(400).json({
        message: "Room already booked for this time",
      });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ✅ Create booking
    const booking = await Booking.create({
      hotelId: room.roomHotelId,
      roomId,
      roomNumber: room.roomnumber,
      guestName,
      guestPhone,
      checkInDateTime,
      checkOutDateTime,
      bookedBy: req.userId,
      status: "active",
    });

    // ✅ Generate correct booked dates
    const dates = getBookedDates(checkInDateTime, checkOutDateTime);

    // ✅ Create room history entries
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



export const getCurrentBookings = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // receptionist / owner hotel should already be known
    // assuming req.hotelId OR fetch from user
    const user = await User.findById(userId);

    if (!user || !user.recephotelId) {
      return res.status(400).json({
        message: "Hotel not assigned to user",
      });
    }

    const hotelId = user.recephotelId;
    const now = new Date();

    const bookings = await Booking.find({
      hotelId,
      status: "active",
      checkOutDateTime: { $gt: now },
    })
      .populate("roomId", "roomnumber")
      .populate("bookedBy", "name email")
      .sort({ checkInDateTime: 1 });

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};




export const getPreviousBookings = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Get hotel of logged-in user (Owner / Recep)
    const user = await User.findById(userId);

    if (!user || !user.recephotelId) {
      return res.status(400).json({
        message: "Hotel not assigned to user",
      });
    }

    const hotelId = user.recephotelId;
    const now = new Date();

    const bookings = await Booking.find({
      hotelId,
      checkOutDateTime: { $lte: now }, // ✅ ONLY PAST
    })
      .populate("roomId", "roomnumber")
      .populate("bookedBy", "name email")
      .sort({ checkOutDateTime: -1 }); // latest first

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
