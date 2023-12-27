/** @format */

import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "dates",
  initialState: {
    item: [],
  },
  reducers: {
    getDates: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { getDates } = dateSlice.actions;
export const dates = (state) => state.dates.item;
export default dateSlice.reducer;
