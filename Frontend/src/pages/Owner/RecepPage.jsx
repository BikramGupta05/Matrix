import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { serverUrl } from "../../App";

function RecepPage({hotelId}) {
    if(!hotelId){
        return (
            <div>
                Provide Hotel Id first
            </div>
        )
    }
    const navigate = useNavigate();
    // const { hotelId } = useParams();

    const [receptionists, setReceptionists] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchReceptionists = async () => {
            try {
                setLoading(true);
                const result=await axios.get(serverUrl+`/api/hotel/receptionists/${hotelId}`,{withCredentials:true})
                setReceptionists(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchReceptionists();
    }, [hotelId]);

    return (
        <div className='flex h-full w-full bg-gray-500'>
            <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-500'>

                {/* HEADER */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-4'>
                    <div className='flex items-center gap-3'>
                        <FaArrowLeftLong
                            className="w-[22px] h-[22px] cursor-pointer"
                            onClick={() => navigate("/hotels")}
                        />
                        <h1 className='text-2xl font-semibold'>All Created Receptionists</h1>
                    </div>

                    <button
                        className='bg-black text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer'
                        onClick={() => navigate(`/createrecep/${hotelId}`)}
                    >
                        + Add New Receptionist
                    </button>
                </div>

                {/* TABLE */}
                <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>

                    <table className='min-w-full text-sm'>
                        <thead className='border-b bg-gray-50'>
                            <tr>
                                <th className='text-left py-3 px-4'>Name</th>
                                <th className='text-left py-3 px-4'>Email</th>
                                <th className='text-left py-3 px-4'>Created</th>
                                <th className='text-left py-3 px-4'>Expenses</th>
                                <th className='text-left py-3 px-4'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">Loading...</td>
                                </tr>
                            ) : receptionists.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No Receptionists Found
                                    </td>
                                </tr>
                            ) : (
                                receptionists.map((r, index) => (
                                    <tr
                                        key={index}
                                        className='border-b hover:bg-gray-50 transition duration-200'
                                    >
                                        <td className='py-3 px-4'>{r?.name}</td>
                                        <td className='py-3 px-4'>{r?.email}</td>
                                        <td className='py-3 px-4'>
                                            {new Date(r?.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className='py-3 px-4'>
                                            <IoEyeOutline
                                                className='text-gray-600 hover:text-blue-600 cursor-pointer'
                                                onClick={() => navigate(`/expenses/${r?._id}`)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <p className='text-center text-sm text-gray-400 mt-6'>
                        A list of your Receptionists.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RecepPage;
