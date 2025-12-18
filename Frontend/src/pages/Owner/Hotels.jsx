import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import { setAdminHotelData } from "../../redux/hotelSlice";
import { Modal } from "./Modal";
import RecepPage from "./RecepPage";
import EditHotel from "./EditHotel";
import AllRooms from "./AllRooms";

function Hotels() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { adminHotelData } = useSelector((state) => state.hotel);

  const [modal, setModal] = useState({
    open: false,
    type: null, // "recep" | "edit"
    hotelId: null,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/hotel/getadminhotel",
          { withCredentials: true }
        );
        dispatch(setAdminHotelData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (userData) fetchHotels();
  }, [userData, dispatch]);

  const openRecepModal = (hotelId) => {
    setModal({ open: true, type: "recep", hotelId });
  };

  const openEditModal = (hotelId) => {
    setModal({ open: true, type: "edit", hotelId });
  };

  const openRoomModal = (hotelId) => {
    setModal({ open: true, type: "room", hotelId });
  };

  const closeModal = () => {
    setModal({ open: false, type: null, hotelId: null });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Created Hotels</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => navigate("/addnewhotel")}
        >
          + Add New Hotel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-3">Hotel Name</th>
              <th className="text-left p-3">Location</th>
              <th className="text-left p-3">Edit</th>
              <th className="text-left p-3">Receptionists</th>
              <th className="text-left p-3">Rooms</th>
            </tr>
          </thead>

          <tbody>
            {adminHotelData?.map((hotel) => (
              <tr key={hotel._id} className="border-b">
                <td className="p-3">{hotel.hname}</td>
                <td className="p-3">{hotel.place}</td>

                <td className="p-3">
                  <FaEdit
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                    onClick={() => openEditModal(hotel._id)}
                  />
                </td>

                <td className="p-3">
                  <FaEye
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                    onClick={() => openRecepModal(hotel._id)}
                  />
                </td>

                <td className="p-3">
                  <FaEye
                    className="cursor-pointer text-gray-600 hover:text-blue-600"
                    onClick={() => openRoomModal(hotel._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SINGLE MODAL */}
      <Modal isOpen={modal.open} onClose={closeModal}>
        {modal.type === "recep" && (
          <RecepPage hotelId={modal.hotelId} />
        )}

        {modal.type === "edit" && (
          <EditHotel hotelId={modal.hotelId} onClose={closeModal} />
        )}

        {modal.type === "room" && (
          <AllRooms hotelId={modal.hotelId} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
}

export default Hotels