import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setAdminHotelData } from "../redux/hotelSlice";

const getAdminHotel = ()=>{
    const dispatch =useDispatch()
    const {userData}=useSelector(state=>state.user)
    return(
        useEffect(()=>{
            const createHotels=async () => {
                try {
                    const result=await axios.get(serverUrl+"/api/hotel/getadminhotel",{withCredentials:true})
                    console.log(result.data)
                    dispatch(setAdminHotelData(result.data))
                } catch (error) {
                 console.log(error)   
                }
            }
            createHotels()
        },[userData])
    )
}
export default getAdminHotel