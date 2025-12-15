import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createExpense, getAllExpensesByCreatorId, getExpensebyRecepId, getExpensesByHotelId, getOwnerAllExpensesSummary } from "../controller/expenseController.js";

const expenseRouter=express.Router()

expenseRouter.post("/createexpense",isAuth,createExpense)
expenseRouter.get("/getallexpense",isAuth,getAllExpensesByCreatorId)
expenseRouter.get("/getrecepexpense/:recepId", isAuth, getExpensebyRecepId);
expenseRouter.get("/owner/summary",isAuth,getOwnerAllExpensesSummary);
expenseRouter.get("/hotel/:hotelId",isAuth,getExpensesByHotelId);

export default expenseRouter