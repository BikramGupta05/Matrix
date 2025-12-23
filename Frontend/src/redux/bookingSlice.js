import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    creating: false,   // booking create loader
    current: [],       // ✅ ongoing bookings
    history: [],       // ✅ previous bookings
    loading: false,    // fetch loader
  },
  reducers: {
    setCreating(state, action) {
      state.creating = action.payload;
    },
    setCurrentBookings(state, action) {
      state.current = action.payload;
    },
    setHistory(state, action) {
      state.history = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearBookings(state) {
      state.current = [];
      state.history = [];
    },
  },
});

export const {
  setCreating,
  setCurrentBookings,
  setHistory,
  setLoading,
  clearBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
