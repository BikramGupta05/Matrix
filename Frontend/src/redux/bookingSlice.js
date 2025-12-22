import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    creating: false,
    history: [],
  },
  reducers: {
    setCreating(state, action) {
      state.creating = action.payload;
    },
    setHistory(state, action) {
      state.history = action.payload;
    },
  },
});

export const { setCreating, setHistory } = bookingSlice.actions;
export default bookingSlice.reducer;
