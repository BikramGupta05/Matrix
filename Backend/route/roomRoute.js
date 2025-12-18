import express from "express";
import { createroom, getRoombyHotelId, getRoomsbyRecepId, updateRoomStatus } from "../controller/roomController.js";
import isAuth from "../middleware/isAuth.js";

const roomRouter=express.Router()

roomRouter.post("/createroom",isAuth,createroom)
roomRouter.get("/getroomsbyhotelid/:hotelId",isAuth,getRoombyHotelId)
roomRouter.get("/getroomsbyrecepid",isAuth,getRoomsbyRecepId)
roomRouter.patch("/updatestatus/:roomId", isAuth, updateRoomStatus);


export default roomRouter