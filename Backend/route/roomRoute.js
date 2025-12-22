import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createroom,
  getRoombyHotelId,
  getRoomsbyRecepId,
  updateRoomStatus,
  getRoomsByDate,
} from "../controller/roomController.js";

const roomRouter = express.Router();

/**
 * CREATE ROOM
 * POST /api/room/create
 */
roomRouter.post("/create", isAuth, createroom);

/**
 * GET ROOMS BY HOTEL ID
 * GET /api/room/hotel/:hotelId
 */
roomRouter.get("/hotel/:hotelId", isAuth, getRoombyHotelId);

/**
 * GET ROOMS FOR LOGGED-IN RECEPTIONIST
 * GET /api/room/recep
 */
roomRouter.get("/recep", isAuth, getRoomsbyRecepId);

/**
 * UPDATE ROOM STATUS (available | onhold | booked)
 * PATCH /api/room/status/:roomId
 */
roomRouter.patch("/status/:roomId", isAuth, updateRoomStatus);

/**
 * GET ROOMS BY DATE (MOST IMPORTANT)
 * GET /api/room/by-date?date=YYYY-MM-DD
 */
roomRouter.get("/by-date", isAuth, getRoomsByDate);

export default roomRouter;
