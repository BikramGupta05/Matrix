import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { setUserData } from "../../redux/userSlice";
function CreateRecep(){
    const navigate=useNavigate()
    const [show,setShow]=useState(false)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [role,setRole]=useState("Recep")
    const {hotelId}=useParams()
    const [recephotelId,setRecephotelId]=useState(hotelId)
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const handleSignup=async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+"/api/auth/signup",{name,password,email,role,recephotelId},{withCredentials:true})
            setLoading(false)
            navigate(-1)
            toast.success("New Receptionist Added Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
        <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
            <FaArrowLeftLong className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate(-1)}/>
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                    Add New Receptionist
                </h2>
                <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Receptionist name' onChange={(e)=>setName(e.target.value)} value={name}/>
                    </div>
                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input id='email' type="email" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Receptionist email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    </div>

                    <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
                         <label htmlFor="password" className='font-semibold'>Password</label>
                         <input id='password' type={show ? "text" : "password"} className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        {show ? <IoEyeOutline className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)}/> :
                        <FaEyeSlash className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]' onClick={()=>setShow(prev=>!prev)}/>}
                    </div>

                    <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]' onClick={handleSignup} disabled={loading}>{loading ? <ClipLoader size={30}color="grey"/>:"Add"}</button>
                </form>
        </div>
    </div>
  )
}
export default CreateRecep




