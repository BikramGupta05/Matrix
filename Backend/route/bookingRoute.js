import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createBooking, getCurrentBookings, getPreviousBookings } from "../controller/bookingController.js";

const bookingRouter = express.Router();

/**
 * CREATE BOOKING
 * POST /api/booking/create
 */
bookingRouter.post("/create", isAuth, createBooking);
bookingRouter.get("/bookings/current", isAuth, getCurrentBookings);
bookingRouter.get("/bookings/previous", isAuth, getPreviousBookings);


export default bookingRouter;
