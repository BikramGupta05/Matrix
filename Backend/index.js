import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectDB.js";
import authRouter from "./route/authRoute.js";
import userRouter from "./route/userRoute.js";
import hotelRouter from "./route/hotelRoute.js";
import expenseRouter from "./route/expenseRoute.js";
import roomRouter from "./route/roomRoute.js";
import bookingRouter from "./route/bookingRoute.js";
dotenv.config()


const port=process.env.PORT
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/room", roomRouter);
app.use("/api/booking", bookingRouter);

app.get("/",(req,res)=>{
    res.send("Hello from server")
})

app.listen(port,()=>{
    console.log("server started")
    connectDb()
})