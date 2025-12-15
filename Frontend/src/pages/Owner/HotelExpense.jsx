import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { setHotelExpenseData } from "../../redux/expenseSlice";
import { FaArrowLeftLong } from "react-icons/fa6";

function HotelExpense() {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const { hotelExpenseData } = useSelector(state => state.expense);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchHotelExpenses = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/expense/hotel/${hotelId}`,
          { withCredentials: true }
        );
        dispatch(setHotelExpenseData(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchHotelExpenses();
  }, [hotelId, dispatch]);

  // ✅ FRONTEND SORTING (NEWEST FIRST)
  const sortedExpenses = hotelExpenseData
    ? [...hotelExpenseData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="p-6">
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 px-4'>
            <div className='flex items-center gap-3'>
                <FaArrowLeftLong className="w-[22px] h-[22px] cursor-pointer" onClick={() => navigate(-1)}/>
                <h2 className='text-2xl font-semibold'>Hotel Expenses</h2>
            </div>
           
        </div>
      

      {!sortedExpenses.length && (
        <p>No expenses found</p>
      )}

      <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Receptionist</th>
              <th className="text-left py-3 px-4">Reason</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Bill Created Date</th>
            </tr>
          </thead>

          <tbody>
            {sortedExpenses.map((exp) => (
              <tr
                key={exp._id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4">
                  {exp.creatorId?.name}
                </td>
                <td className="px-4 py-3">
                  {exp.reason}
                </td>
                <td className="px-4 py-3">
                  ₹{exp.price}
                </td>
                <td className="px-4 py-3">
                  {new Date(exp.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HotelExpense;
