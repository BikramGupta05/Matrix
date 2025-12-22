import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../App";
import BookingModal from "./BookingModal.jsx";

/* =========================
   ROOM CARD
========================= */
const RoomCard = ({ room, changeStatus, setSelectedRoom }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 text-center">
    <div className="font-semibold">Room {room.roomnumber}</div>

    {room.status === "available" && (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => changeStatus(room._id, "onhold")}
          className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
        >
          Hold
        </button>
        <button
          onClick={() => setSelectedRoom(room)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
        >
          Book
        </button>
      </div>
    )}

    {room.status === "onhold" && (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => changeStatus(room._id, "available")}
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
        >
          Available
        </button>
        <button
          onClick={() => setSelectedRoom(room)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
        >
          Book
        </button>
      </div>
    )}

    {room.status === "booked" && (
      <span className="text-red-600 font-semibold">Booked</span>
    )}
  </div>
);

/* =========================
   SECTION
========================= */
const Section = ({ title, rooms, changeStatus, setSelectedRoom }) => (
  <div className="border rounded-xl p-4">
    <h3 className="font-semibold mb-4 flex justify-between">
      <span>{title}</span>
      <span>{rooms.length}</span>
    </h3>

    <div className="flex flex-col gap-3">
      {rooms.length === 0 ? (
        <p className="text-gray-400 text-center">No rooms</p>
      ) : (
        rooms.map(room => (
          <RoomCard
            key={room._id}
            room={room}
            changeStatus={changeStatus}
            setSelectedRoom={setSelectedRoom}
          />
        ))
      )}
    </div>
  </div>
);

/* =========================
   MAIN COMPONENT
========================= */
function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${serverUrl}/api/room/by-date?date=${selectedDate}`,
        { withCredentials: true }
      );
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [selectedDate]);

  const changeStatus = async (roomId, status) => {
    try {
      await axios.patch(
        `${serverUrl}/api/room/status/${roomId}`,
        { status },
        { withCredentials: true }
      );

      setRooms(prev =>
        prev.map(r =>
          r._id === roomId ? { ...r, status } : r
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onBookingSuccess = roomId => {
    setRooms(prev =>
      prev.map(r =>
        r._id === roomId ? { ...r, status: "booked" } : r
      )
    );
  };

  const availableRooms = rooms.filter(r => r.status === "available");
  const onHoldRooms = rooms.filter(r => r.status === "onhold");
  const bookedRooms = rooms.filter(r => r.status === "booked");

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-3 items-center">
        <span>Date:</span>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Section
            title="Available"
            rooms={availableRooms}
            changeStatus={changeStatus}
            setSelectedRoom={setSelectedRoom}
          />
          <Section
            title="On Hold"
            rooms={onHoldRooms}
            changeStatus={changeStatus}
            setSelectedRoom={setSelectedRoom}
          />
          <Section
            title="Booked"
            rooms={bookedRooms}
            changeStatus={changeStatus}
            setSelectedRoom={setSelectedRoom}
          />
        </div>
      )}

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSuccess={onBookingSuccess}
        />
      )}
    </div>
  );
}

export default Rooms;
