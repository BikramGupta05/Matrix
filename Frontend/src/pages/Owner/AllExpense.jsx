import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../App";
import { setOwnerSummary } from "../../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";

function AllExpense() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ownerSummary } = useSelector(state => state.expense);
  const { adminHotelData } = useSelector(state => state.hotel);

  const [range, setRange] = useState("all");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/expense/owner/summary?range=${range}`,
          { withCredentials: true }
        );
        dispatch(setOwnerSummary(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchSummary();
  }, [range, dispatch]);

  if (!ownerSummary || !adminHotelData) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All Expenses</h1>

      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-4'>
            {/* SUMMARY */}
          <div className="flex gap-6 justify-between">
            <div className="p-4 border rounded">
              Total Hotels: {ownerSummary.totalHotels}
            </div>
            <div className="p-4 border rounded">
              Total Expense: ₹{ownerSummary.grandTotalExpense}
            </div>
          </div>

          {/* DATE RANGE */}
          <div className="mb-4">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border px-4 py-2 rounded"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 1 Year</option>
            </select>
          </div>
      </div>

      

      

      {/* TABLE */}
      <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
      <table className='min-w-full text-sm'>
        <thead className='border-b bg-gray-50'>
            <tr>
                <th className='text-left py-3 px-4'>Hotel Name</th>
                <th className='text-left py-3 px-4'>Location</th>
                <th className='text-left py-3 px-4'>Total Expense</th>
                <th className='text-left py-3  pl-0'>See Expenses for this hotel</th>
            </tr>
        </thead>

        <tbody>
          {adminHotelData.map(hotel => {
            // ✅ FIX: ObjectId → string comparison
            const matchedExpense =
              ownerSummary.hotelWiseExpense?.find(
                h => h._id?.toString() === hotel._id
              );

            return (
              <tr key={hotel._id} className='border-b hover:bg-gray-50 transition duration-200'>
                <td className='py-3 px-4 flex items-center gap-4'>{hotel.hname}</td>
                <td className='px-4 py-3'>{hotel.place}</td>
                <td className='px-4 py-3'>
                  ₹{matchedExpense?.totalExpense || 0}
                </td>
                <td className='py-3  pl-1'>
                    <IoEyeOutline className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() =>navigate(`/hotel-expense/${hotel._id}`)}/>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      </div>
    </div>
  );
}

export default AllExpense;
