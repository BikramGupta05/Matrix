import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    selectedDate: new Date().toISOString().split("T")[0],
    loading: false,
  },
  reducers: {
    setRooms(state, action) {
      state.rooms = action.payload;
    },
    setDate(state, action) {
      state.selectedDate = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setRooms, setDate, setLoading } = roomSlice.actions;
export default roomSlice.reducer;
