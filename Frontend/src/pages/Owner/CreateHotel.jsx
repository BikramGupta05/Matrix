import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
function CreateHotel(){
    const navigate=useNavigate()
    const [hname,setHname]=useState("")
    const [place,setPlace]=useState("")
    const [loading,setLoading]=useState(false)

    const handleCreateHotel= async () => {
        setLoading(true)
        try {
            const result= await axios.post(serverUrl+"/api/hotel/createhotel",{hname,place},{withCredentials:true})
            console.log(result.data)
            navigate("/hotels")
            setLoading(false)
            toast.success("New Hotel Added Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
            <FaArrowLeftLong className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/hotels")}/>
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                    Add New Hotel
                </h2>
                <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
                    <div>
                        <label htmlFor="hname" className='text-sm font-medium text-gray-700'>Hotel Name</label>
                        <input id='hname' type="text"
                        className='w-full px-4 py-2 border rounded-md text-sm'  onChange={(e)=>setHname(e.target.value)} value={hname}/>
                    </div>

                    <div>
                        <label htmlFor="place" className='text-sm font-medium text-gray-700'>Location</label>
                        <input id="place" type="text"
                        className='w-full px-4 py-2 border rounded-md text-sm' onChange={(e)=>setPlace(e.target.value)} value={place}/>
                    </div>

                    <button className='w-full bg-[black] active:ng-[#454545] text-white py-2 rounded-md font-medium transition  cursor-pointer ' onClick={handleCreateHotel}>{loading? <ClipLoader size={30} color="grey"/>: "Save Changes"}</button>
                </form>
        </div>
    </div>
  )
}
export default CreateHotel




