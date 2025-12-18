import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    adminHotelData: []
  },
  reducers: {
    setAdminHotelData: (state, action) => {
      state.adminHotelData = action.payload;
    },

    // ADD THIS
    removeHotelFromList: (state, action) => {
      state.adminHotelData = state.adminHotelData.filter(
        hotel => hotel._id !== action.payload
      );
    }
  }
});

export const { setAdminHotelData, removeHotelFromList } = hotelSlice.actions;
export default hotelSlice.reducer;
