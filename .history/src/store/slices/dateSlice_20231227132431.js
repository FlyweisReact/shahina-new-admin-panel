/** @format */

import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "dates",
  initialState: {
    item: null,
  },
  reducers: {
    getDates: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { getDates } = dateSlice.actions;
export const  = (state) => state.dates.item;
export default cartSlice.reducer;
