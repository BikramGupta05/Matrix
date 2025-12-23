import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../../App";
import {
  setCurrentBookings,
  setHistory,
  setLoading,
} from "../../redux/bookingSlice";

/* =====================
   HELPERS
===================== */

const formatDate = date =>
  new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

// Hotel-correct date logic
// booking is visible on a date D if:
// checkIn <= D < checkOut
const isBookingOnDate = (booking, selectedDate) => {
  if (!selectedDate) return true;

  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);

  const checkIn = new Date(booking.checkInDateTime);
  const checkOut = new Date(booking.checkOutDateTime);

  checkIn.setHours(0, 0, 0, 0);
  checkOut.setHours(0, 0, 0, 0);

  return checkIn <= selected && selected < checkOut;
};

function AllBookings() {
  const dispatch = useDispatch();
  const { current = [], history = [], loading } = useSelector(
    state => state.booking
  );

  // 🔹 frontend-only date filter
  const [filterDate, setFilterDate] = useState("");

  /* =====================
     FETCH BOOKINGS
  ===================== */
  useEffect(() => {
    const loadBookings = async () => {
      try {
        dispatch(setLoading(true));

        const [currentRes, previousRes] = await Promise.all([
          axios.get(`${serverUrl}/api/booking/bookings/current`, {
            withCredentials: true,
          }),
          axios.get(`${serverUrl}/api/booking/bookings/previous`, {
            withCredentials: true,
          }),
        ]);

        dispatch(setCurrentBookings(currentRes.data || []));
        dispatch(setHistory(previousRes.data || []));
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadBookings();
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg">
        Loading bookings...
      </p>
    );
  }

  const now = new Date();

  /* =====================
     UI
  ===================== */
  return (
    <div className="p-6">
      {/* DATE FILTER */}
      <div className="mb-6 flex items-center gap-3">
        <label className="font-medium">Filter by date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="text-blue-600 text-sm"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ================= CURRENT / UPCOMING BOOKINGS ================= */}
        <div className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4">
            Current & Upcoming Bookings
          </h2>

          {current.filter(b =>
            isBookingOnDate(b, filterDate)
          ).length === 0 ? (
            <p className="text-gray-400 text-center">
              No bookings for selected date
            </p>
          ) : (
            <div className="space-y-3">
              {current
                .filter(b => isBookingOnDate(b, filterDate))
                .map(b => {
                  const isUpcoming =
                    new Date(b.checkInDateTime) > now;

                  return (
                    <div
                      key={b._id}
                      className="border rounded-lg p-3 flex justify-between"
                    >
                      <div>
                        <div className="font-medium">
                          {b.guestName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {b.guestPhone}
                        </div>
                        <div className="text-sm">
                          From: {formatDate(b.checkInDateTime)}
                        </div>
                        <div className="text-sm">
                          To: {formatDate(b.checkOutDateTime)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          Room {b.roomNumber}
                        </div>
                        <div
                          className={`font-medium ${
                            isUpcoming
                              ? "text-blue-600"
                              : "text-green-600"
                          }`}
                        >
                          {isUpcoming ? "Upcoming" : "Active"}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* ================= PREVIOUS BOOKINGS ================= */}
        <div className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-4">
            Previous Bookings
          </h2>

          {history.filter(b =>
            isBookingOnDate(b, filterDate)
          ).length === 0 ? (
            <p className="text-gray-400 text-center">
              No bookings for selected date
            </p>
          ) : (
            <div className="space-y-3">
              {history
                .filter(b => isBookingOnDate(b, filterDate))
                .map(b => (
                  <div
                    key={b._id}
                    className="border rounded-lg p-3 flex justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        {b.guestName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {b.guestPhone}
                      </div>
                      <div className="text-sm">
                        From: {formatDate(b.checkInDateTime)}
                      </div>
                      <div className="text-sm">
                        To: {formatDate(b.checkOutDateTime)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold">
                        Room {b.roomNumber}
                      </div>
                      <div className="text-gray-500 font-medium">
                        Completed
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllBookings;
