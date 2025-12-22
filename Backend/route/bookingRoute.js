import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createBooking } from "../controller/bookingController.js";

const bookingRouter = express.Router();

/**
 * CREATE BOOKING
 * POST /api/booking/create
 */
bookingRouter.post("/create", isAuth, createBooking);

export default bookingRouter;
