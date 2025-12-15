import mongoose from "mongoose";
import Expense from "../model/expenseModel.js";
import User from "../model/userModel.js";
import Hotel from "../model/hotelModel.js";

//for creating new hotel in another slice so that if recep will get deleted by the admin but the expence should still show in the hotel but if admin want to delete it then they can do it
export const createExpense=async (req,res) => {
    try {
        const {name,reason,price}=req.body
        if(!name || !reason || !price){
            return res.status(400).json({message:"Fill all the details"})
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const expense=await Expense.create({
            name,
            reason,
            price,
            creatorId:req.userId,
            creatorHotelId:user.recephotelId,
        })
        return res.status(200).json(expense)
    } catch (error) {
        return res.status(500).json({message:`Expense Creating error ${error}`})
    }
}

//for showing all expenses

export const getAllExpensesByCreatorId= async (req,res) => {
    try {
        const user = await User.findById(req.userId);
        let expenses;

        if (user.role === "Recep") {
           expenses=await Expense.find({creatorId:user})
        }else{
            const {creatorId}=req.params
            expenses=await Expense.find({creatorId:creatorId})
        }
        
        if(!expenses){
            return res.status(400).json({message:"Expenses not found"})
        }
        return res.status(200).json(expenses)
    } catch (error) {
        return res.status(500).json({message:`failed to expenses ${error}`})
    }
}


export const getExpensebyRecepId= async (req, res) => {
  try {
    const { recepId } = req.params

    // optional: validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(recepId)) {
      return res.status(400).json({ message: 'Invalid recepId id' })
    }

    // Find expense with RecepId/creatorId 
    const expenses = await Expense.find({creatorId:recepId})

    return res.status(200).json(expenses)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error Failed to get Expense ' })
  }
}


export const getOwnerAllExpensesSummary = async (req, res) => {
  try {
    const { range } = req.query; // today | week | month | year | all
    const now = new Date();
    let startDate = null;

    if (range === "today") {
      startDate = new Date(now.setHours(0, 0, 0, 0));
    } 
    else if (range === "week") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } 
    else if (range === "month") {
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
    } 
    else if (range === "year") {
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
    }

    // Owner hotels
    const hotels = await Hotel.find({ admin: req.userId });
    const hotelIds = hotels.map(h => h._id);

    // Match condition
    const matchStage = {
      creatorHotelId: { $in: hotelIds }
    };

    if (startDate) {
      matchStage.createdAt = { $gte: startDate };
    }

    const summary = await Expense.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$creatorHotelId",
          totalExpense: { $sum: "$price" }
        }
      }
    ]);

    const grandTotal = summary.reduce(
      (sum, h) => sum + h.totalExpense,
      0
    );

    return res.status(200).json({
      totalHotels: hotels.length,
      grandTotalExpense: grandTotal,
      hotelWiseExpense: summary
    });

  } catch (error) {
    return res.status(500).json({
      message: "Owner expense summary error",
      error
    });
  }
};



export const getExpensesByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    const expenses = await Expense.find({
      creatorHotelId: hotelId
    }).populate("creatorId", "name email");

    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch hotel expenses"
    });
  }
};

