import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";

function BookingModal({ room, onClose, onSuccess }) {
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    checkInDateTime: "",
    checkOutDateTime: "",
  });

  // 🔴 CHANGED: current date-time restriction
  const now = new Date().toISOString().slice(0, 16);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${serverUrl}/api/booking/create`,
        {
          roomId: room._id,
          guestName: form.guestName,
          guestPhone: form.guestPhone,
          checkInDateTime: form.checkInDateTime,
          checkOutDateTime: form.checkOutDateTime,
        },
        { withCredentials: true }
      );

      onSuccess(room._id);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="font-semibold mb-4">
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

        {/* 🔴 CHANGED */}
        <input
          type="datetime-local"
          min={now}
          className="w-full border p-2 mb-2"
          onChange={e =>
            setForm({ ...form, checkInDateTime: e.target.value })
          }
        />

        {/* 🔴 CHANGED */}
        <input
          type="datetime-local"
          min={form.checkInDateTime || now}
          className="w-full border p-2 mb-4"
          onChange={e =>
            setForm({ ...form, checkOutDateTime: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Booking..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
