import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditHotel(){
    const navigate=useNavigate()
    const [atmremove,setAtmRemove]=useState(false)
    const [loading,setLoading] =useState(false)
    const [loadingR,setLoadingR] =useState(false)
    const {hotelId}=useParams()
    const [selectHotel,setSelectHotel]=useState(null)

    const [hname,setHname]=useState("")
    const [place,setPlace]=useState("")

    //yanah pe hm hotel ka id laye jisse ki hm previous data fetch kr paye hotels ka jise edit krne me assani hoga
    const getHotelById= async () => {
        try {
            const result = await axios.get(serverUrl+`/api/hotel/gethotel/${hotelId}`,{withCredentials:true})
            setSelectHotel(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    // yanah pe jo previous data h usko ka phle show kra rhe h 
    useEffect(()=>{
        if(selectHotel){
            setHname(selectHotel.hname || "")
            setPlace(selectHotel.place || "")
        }
    },[selectHotel])
    useEffect(()=>{
        getHotelById()
    },[])

    const handleEditHotel = async () => {
        setLoading(true)
        // const formData= new FormData()
        // formData.append("hname",hname)
        // formData.append("place",place)
        try {
            const result= await axios.post(serverUrl+`/api/hotel/edithotel/${hotelId}`,{ hname, place },{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            navigate("/hotels")
            toast.success("Info Updated")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    //Hotels ko permanentally delete krne ke liye
    const handleRemoveHotel = async () => {
        setLoadingR(true)
        try {
            const result = await axios.delete(serverUrl+`/api/hotel/remove/${hotelId}`,{withCredentials:true})
            console.log(result.data)
            setLoadingR(false)
            toast.success("Hotel Removed")
            navigate("/hotels")
        } catch (error) {
            console.log(error)
            setLoadingR(false)
            toast.error(error.response.data.message)
        }
    }
    return(
        <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
                <FaArrowLeftLong className='absolute top-[-20%] left-[0] md:top-[20%] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/hotels")}/>

                <h2 className='text-2xl font-semibold md:pl-[60px]'>Edit Basic Hotel Information</h2>
                <div className='space-x-2 space-y-2'>
                    <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>navigate(`/receppage/${hotelId}`)}>Go to Recep page</button>
                </div>    
            </div>
            <div className='bg-gray-50 p-6 rounded-md'>
                <form className='space-y-6' onSubmit={(e)=>e.preventDefault()}>
                    <div>
                        <label htmlFor="hname" className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input id='hname' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Hotel Name' onChange={(e)=>setHname(e.target.value)} value={hname}/>
                    </div>

                    <div>
                        <label htmlFor="place" className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                        <input id='place' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Hotel Location' onChange={(e)=>setPlace(e.target.value)} value={place}/>
                    </div>

                    <div className='flex items-center justify-start gap-[15px]'>
                        <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate("/hotels")}>Cancel</button>
                       <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' onClick={handleEditHotel}>{loading? <ClipLoader size={30} color="grey"/>:"Save Changes"}</button>
                    </div>
                </form>
                <div className='space-x-2 pt-6'>
                    <button className='bg-red-300 text-white px-4 py-2 rounded-md ' onClick={()=>setAtmRemove(prev=>!prev)} >Remove Hotel</button>
                </div>
                {atmremove && <div className='space-x-2 pt-6'>
                    <div>Think again before confirmation</div>
                    <div className='flex items-center justify-start gap-[15px]'>
                        <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate("/hotels")}>Cancel</button>
                       <button className='bg-red-600 text-white px-4 py-2 rounded-md ' onClick={handleRemoveHotel} >Remove</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default EditHotel