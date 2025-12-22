import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function AllRooms({ hotelId }) {
  if (!hotelId) {
    return <p className="text-center text-gray-500">Provide Hotel Id first</p>;
  }

  const [roomnumber, setRoomnumber] = useState("");
  const [status] = useState("available");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [rooms, setRooms] = useState([]);

  // 🔹 FETCH ROOMS
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        serverUrl + `/api/room/hotel/${hotelId}`,
        { withCredentials: true }
      );
      setRooms(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CREATE ROOM
  const handleCreateRoom = async () => {
    if (!roomnumber) {
      toast.error("Room number is required");
      return;
    }

    try {
      setAdding(true);
      await axios.post(
        serverUrl + "/api/room/create",
        { roomnumber, status, roomHotelId: hotelId },
        { withCredentials: true }
      );

      toast.success("New Room Added Successfully");
      setRoomnumber("");

      await fetchRooms(); // ✅ INSTANT UI UPDATE
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setAdding(false);
    }
  };

  // 🔹 LOAD ROOMS ON HOTEL CHANGE
  useEffect(() => {
    fetchRooms();
  }, [hotelId]);

  return (
    <div className="w-full p-6">
      {/* HEADER */}
      <div className="grid grid-cols-2 items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          All Your Rooms
        </h2>

        <div className="flex justify-end">
          <div className="flex items-center gap-3 bg-white shadow-lg rounded-xl p-4">
            <span className="font-medium text-gray-700">Add New Room</span>

            <input
              type="number"
              placeholder="Room number"
              value={roomnumber}
              onChange={(e) => setRoomnumber(e.target.value)}
              className="w-40 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={handleCreateRoom}
              disabled={adding}
              className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
            >
              {adding ? <ClipLoader size={16} color="white" /> : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-4 gap-6">
        {loading ? (
          <p className="col-span-4 text-center py-4">Loading...</p>
        ) : rooms.length === 0 ? (
          <p className="col-span-4 text-center py-4 text-gray-500">
            No Rooms Found
          </p>
        ) : (
          rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow p-5 text-center"
            >
              {room.roomnumber}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllRooms;
