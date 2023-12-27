/** @format */

import { createSlice } from "@reduxjs/toolkit";

export const datesSlice = createSlice({
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

export const { getDates } = datesSlice.actions;
export const dates = (state) => state.dates.item;
export default datesSlice.reducer;
