import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createHotel, editHotel, getAdminHotels, gethotelById, getHotelReceptionists, removeHotel } from "../controller/hotelController.js";

const hotelRouter = express.Router()

hotelRouter.post("/createhotel",isAuth,createHotel)
hotelRouter.get("/getadminhotel",isAuth,getAdminHotels)
hotelRouter.post("/edithotel/:hotelId",isAuth,editHotel)
hotelRouter.get("/gethotel/:hotelId",isAuth,gethotelById)
hotelRouter.delete("/remove/:hotelId",isAuth,removeHotel)
hotelRouter.get("/receptionists/:hotelId", isAuth, getHotelReceptionists);

export default hotelRouter