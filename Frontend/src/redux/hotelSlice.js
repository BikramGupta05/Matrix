import { createSlice } from "@reduxjs/toolkit";

 
const hotelSlice = createSlice({
    name:"hotel",
    initialState:{
        adminHotelData:null
    },
    reducers:{
        setAdminHotelData:(state,action)=>{
            state.adminHotelData=action.payload
        }
    }
})

export const {setAdminHotelData}=hotelSlice.actions
export default hotelSlice.reducer