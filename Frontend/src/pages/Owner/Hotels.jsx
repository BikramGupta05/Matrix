import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { setAdminHotelData } from "../../redux/hotelSlice";

function Hotels(){
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const {userData} = useSelector(state=>state.user)
    //extracting admin hotel data so that i can show it on the dashboard
    const {adminHotelData} = useSelector(state=>state.hotel)
    //making this so that instant data will be shown on the web 
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
    return(
        <div className='flex min-h-screen bg-gray-100'>
            <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-4'>
                    <div className='flex items-center justify-center gap-3'>
                        <h1 className='text-2xl font-semibold'>All Created Hotels</h1>
                    </div>
                    <button className='bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer'onClick={()=>navigate("/addnewhotel")} >+ Add New Hotels</button>
                </div>
                <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
                    <table className='min-w-full text-sm'>
                    <thead className='border-b bg-gray-50'>
                        <tr>
                           <th className='text-left py-3 px-4'>Hotel Name</th>
                           <th className='text-left py-3 px-4'>Location</th>
                            <th className='text-left py-3 px-4'>Action</th>
                            <th className='text-left py-3  pl-1'>Manage Recep</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminHotelData?.map((hotel,index)=>(
                            <tr key={index} className='border-b hover:bg-gray-50 transition duration-200'>
                                <td className='py-3 px-4 flex items-center gap-4'>
                                   <span>{hotel?.hname}</span>
                                </td>
                                <td className='px-4 py-3'>{hotel?.place}</td> 
                                <td className='px-4 py-3'>
                                   <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={()=>navigate(`/edithotel/${hotel?._id}`)}/>
                               </td>
                               <td className='py-3  pl-1'>
                                   <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={()=>navigate(`/receppage/${hotel?._id}`)}/>
                               </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <p className='text-center text-sm text-gray-400 mt-6'>A list of your Hotels.</p>
                </div>
            </div>
        </div>
    )
}
export default Hotels


