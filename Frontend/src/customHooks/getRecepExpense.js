import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setHotelExpenseData } from "../redux/expenseSlice.js";

const getRecepExpense =() => {
    const dispatch=useDispatch()
    const userData=useSelector(state=>state.user)
    return(
        useEffect(() => {
            const createExpense=async () => {
                try {
                    const result=await axios.get(serverUrl+"/api/expense/getallexpense",{withCredentials:true})
                    console.log(result.data)
                    dispatch(setHotelExpenseData(result.data))
                } catch (error) {
                 console.log(error)   
                }
            }
            createExpense()
        },[userData])
    )
}
export default getRecepExpense