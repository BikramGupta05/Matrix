import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import axios from "axios";
import { setHotelExpenseData } from "../../redux/expenseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

function Expenses(){
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { recepId } = useParams();

    const [expenseData, setExpenseData] = useState([]);
    //adding things so that all the expenses show on the web page
         const {userData} = useSelector(state=>state.user)
          //extracting admin hotel data so that i can show it on the dashboard
             const {hotelExpenseData} = useSelector(state=>state.expense)

             const {adminHotelData} = useSelector(state=>state.hotel)
            useEffect(()=>{
                const createExpense=async () => {
                    try {
                        if (userData.role === "Recep") {
                            const result = await axios.get(serverUrl + "/api/expense/getallexpense",{ withCredentials: true });
                            dispatch(setHotelExpenseData(result.data));
                        } else if (userData.role === "Owner") {
                            const result = await axios.get(serverUrl + `/api/expense/getrecepexpense/${recepId}`,{ withCredentials: true });
                            setExpenseData(result.data);
                        }
                    } catch (error) {
                     console.log(error)   
                    }
                }
                createExpense()
            },[userData, recepId, dispatch])
    const tableData =userData?.role === "Recep" ? hotelExpenseData : expenseData;
    return (
        <div className='flex min-h-screen bg-gray-100'>
            <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-4'>
                    <div className='flex items-center justify-center gap-3'>
                        {userData?.role==="Owner" && <FaArrowLeftLong className="w-[22px] h-[22px] cursor-pointer" onClick={() => navigate(-1)}/>}
                        <h1 className='text-2xl font-semibold'>All Previous Data</h1>
                    </div>
                    {userData?.role==="Recep" && <button className='bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer'onClick={()=>navigate("/addnewexpense")} >+ Add New Expense</button>}
                </div>
                <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
                    <table className='min-w-full text-sm'>
                    <thead className='border-b bg-gray-50'>
                        <tr>
                           <th className='text-left py-3 px-4'>Name</th>
                           <th className='text-left py-3 px-4'>Reason</th>
                            <th className='text-left py-3 px-4'>Amount Spend</th>
                            <th className='text-left py-3  pl-1'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData?.map((e,index)=>(
                            <tr key={index} className='border-b hover:bg-gray-50 transition duration-200'>
                                <td className='py-3 px-4 flex items-center gap-4'>
                                   <span>{e?.name}</span>
                                </td>
                                <td className='px-4 py-3'>{e?.reason}</td> 
                                <td className='px-4 py-3'>{e?.price}</td> 
                                <td className='py-3 px-4'>
                                    {new Date(e?.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                    <p className='text-center text-sm text-gray-400 mt-6'>A list of your Expenses.</p>
                </div>
            </div>
        </div>
    )
}

export default Expenses