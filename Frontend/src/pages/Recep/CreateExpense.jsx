import axios from "axios";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useState } from "react";

function CreateExpense(){
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [reason,setReason]=useState("")
    const [price,setPrice]=useState("")
    const [loading,setLoading]=useState(false)
    
    const handleCreatExpense= async () => {
        setLoading(true)
        try {
            const result= await axios.post(serverUrl+"/api/expense/createexpense",{name,reason,price},{withCredentials:true})
            console.log(result.data)
            navigate("/expenses")
            setLoading(false)
            toast.success("New Expense Added Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }     
    return (
        <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
            <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
                <FaArrowLeftLong className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/expenses")}/>
                    <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
                    Add New Expense
                    </h2>
                    <form action="" className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
                        <div>
                            <label htmlFor="name" className='text-sm font-medium text-gray-700'>Name</label>
                            <input id='name' type="text"
                        className='w-full px-4 py-2 border rounded-md text-sm' onChange={(e)=>setName(e.target.value)} value={name} />
                        </div>

                        <div>
                        <label htmlFor="reason" className='text-sm font-medium text-gray-700'>Reason</label>
                            <input id="reason" type="text"
                        className='w-full px-4 py-2 border rounded-md text-sm'  onChange={(e)=>setReason(e.target.value)} value={reason}/>
                        </div>

                        <div>
                        <label htmlFor="price" className='text-sm font-medium text-gray-700'>Price</label>
                            <input id="price" type="text"
                        className='w-full px-4 py-2 border rounded-md text-sm'  onChange={(e)=>setPrice(e.target.value)} value={price}/>
                        </div>

                        <button className='w-full bg-[black] active:ng-[#454545] text-white py-2 rounded-md font-medium transition  cursor-pointer 'onClick={handleCreatExpense} >Save Changes</button>
                    </form>
            </div>
        </div>
    )
}
export default CreateExpense