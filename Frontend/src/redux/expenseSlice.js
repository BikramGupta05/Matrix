import { createSlice } from "@reduxjs/toolkit";


const expenseSlice= createSlice({
    name:"expense",
    initialState:{
        ownerSummary: null,
        hotelExpenseData:null
    },
    reducers:{
        setOwnerSummary: (state, action) => {
            state.ownerSummary = action.payload;
        },
        setHotelExpenseData:(state,action)=>{
            state.hotelExpenseData=action.payload
        }
    }
})
export const {setOwnerSummary, setHotelExpenseData}=expenseSlice.actions
export default expenseSlice.reducer


// const expenseSlice = createSlice({
//   name: "expense",
//   initialState: {
//     ownerSummary: null,
//     hotelExpenses: null
//   },
//   reducers: {
//     setOwnerSummary: (state, action) => {
//       state.ownerSummary = action.payload;
//     },
//     setHotelExpenses: (state, action) => {
//       state.hotelExpenses = action.payload;
//     }
//   }
// });

// export const { setOwnerSummary, setHotelExpenses } = expenseSlice.actions;
// export default expenseSlice.reducer;
