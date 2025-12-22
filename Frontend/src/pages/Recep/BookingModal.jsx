import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";

function BookingModal({ room, onClose, onSuccess }) {
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const { guestName, guestPhone, checkInDate, checkOutDate } = form;

    if (!guestName || !guestPhone || !checkInDate || !checkOutDate) {
      alert("Fill all details");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      alert("Check-out date must be after check-in date");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/booking/create`,
        {
          roomId: room._id,
          guestName,
          guestPhone,
          checkInDate,
          checkOutDate,
        },
        { withCredentials: true }
      );

      onSuccess(room._id);
      onClose();
    } catch (error) {
      console.log(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          Book Room {room.roomnumber}
        </h2>

        <input
          placeholder="Guest Name"
          className="w-full border p-2 mb-2"
          onChange={e =>
            setForm({ ...form, guestName: e.target.value })
          }
        />

        <input
          placeholder="Phone"
          className="w-full border p-2 mb-2"
          onChange={e =>
            setForm({ ...form, guestPhone: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full border p-2 mb-2"
          onChange={e =>
            setForm({ ...form, checkInDate: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full border p-2 mb-4"
          onChange={e =>
            setForm({ ...form, checkOutDate: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
