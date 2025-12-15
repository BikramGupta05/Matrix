// routes/authroute.js
import express from "express";
import isAuth from "../middleware/isAuth.js"; // make sure this middleware sets req.userId
import {googleAuth, login, logOut, resetPassword, sendOtp, signUp, verifyOTP, createRecepByAdmin,}
from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logOut);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOTP);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googleauth", googleAuth);

// New admin-only route to create receptionists (Owner only)
authRouter.post("/create-recep", isAuth, createRecepByAdmin);

export default authRouter;
