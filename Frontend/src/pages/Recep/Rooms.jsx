import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../App";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch rooms for receptionist
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        serverUrl + "/api/room/getroomsbyrecepid",
        { withCredentials: true }
      );
      setRooms(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 🔹 Change room status (available ↔ onhold)
  const changeStatus = async (roomId, newStatus) => {
    try {
      await axios.patch(
        serverUrl + `/api/room/updatestatus/${roomId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // ✅ Instant UI update
      setRooms(prev =>
        prev.map(room =>
          room._id === roomId
            ? { ...room, status: newStatus }
            : room
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Group + sort rooms
  const availableRooms = rooms
    .filter(r => r.status === "available")
    .sort((a, b) => Number(a.roomnumber) - Number(b.roomnumber));

  const onHoldRooms = rooms
    .filter(r => r.status === "onhold")
    .sort((a, b) => Number(a.roomnumber) - Number(b.roomnumber));

  const bookedRooms = rooms
    .filter(r => r.status === "booked")
    .sort((a, b) => Number(a.roomnumber) - Number(b.roomnumber));

  // 🔹 Room Card Component
  const RoomCard = ({ room }) => (
    <div className="grid grid-cols-2 gap-6 bg-white rounded-xl shadow px-4 py-3 flex flex-col gap-2 text-center font-medium">
      <div>Room No: {room.roomnumber}</div>

      <div className="flex justify-center gap-2">

        {/* AVAILABLE → HOLD + BOOK */}
        {room.status === "available" && (
          <>
            <button
              onClick={() => changeStatus(room._id, "onhold")}
              className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
            >
              Hold
            </button>

            <button
              disabled
              className="text-sm bg-gray-200 text-gray-500 px-3 py-1 rounded-full cursor-not-allowed"
            >
              Book
            </button>
          </>
        )}

        {/* ON HOLD → AVAILABLE + BOOK */}
        {room.status === "onhold" && (
          <>
            <button
              onClick={() => changeStatus(room._id, "available")}
              className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full"
            >
              Available
            </button>

            <button
              disabled
              className="text-sm bg-gray-200 text-gray-500 px-3 py-1 rounded-full cursor-not-allowed"
            >
              Book
            </button>
          </>
        )}

        {/* BOOKED → NO ACTION */}
        {room.status === "booked" && (
          <span className="text-sm text-red-500 font-semibold">
            Booked
          </span>
        )}

      </div>
    </div>
  );

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* AVAILABLE */}
          <div className="border rounded-xl p-4">
            <h3 className="flex justify-between mb-4 font-semibold">
              <span>Available</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {availableRooms.length}
              </span>
            </h3>

            <div className="flex flex-col gap-3">
              {availableRooms.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">No rooms</p>
              ) : (
                availableRooms.map(room => (
                  <RoomCard key={room._id} room={room} />
                ))
              )}
            </div>
          </div>

          {/* ON HOLD */}
          <div className="border rounded-xl p-4">
            <h3 className="flex justify-between mb-4 font-semibold">
              <span>On Hold</span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                {onHoldRooms.length}
              </span>
            </h3>

            <div className="flex flex-col gap-3">
              {onHoldRooms.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">No rooms</p>
              ) : (
                onHoldRooms.map(room => (
                  <RoomCard key={room._id} room={room} />
                ))
              )}
            </div>
          </div>

          {/* BOOKED */}
          <div className="border rounded-xl p-4">
            <h3 className="flex justify-between mb-4 font-semibold">
              <span>Booked</span>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                {bookedRooms.length}
              </span>
            </h3>

            <div className="flex flex-col gap-3">
              {bookedRooms.length === 0 ? (
                <p className="text-sm text-gray-400 text-center">No rooms</p>
              ) : (
                bookedRooms.map(room => (
                  <RoomCard key={room._id} room={room} />
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Rooms;
