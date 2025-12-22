import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomnumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "onhold", "booked"],
      default: "available",
    },
    roomHotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
