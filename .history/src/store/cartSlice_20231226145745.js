/** @format */

import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    item,
  },
  reducers: {
    getAppointmentDates: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { getAppointmentDates } = appointmentSlice.actions;
export const ap = (state) => state.appointment.item;
export default cartSlice.reducer;
