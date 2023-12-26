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

export const { getCartItems } = cartSlice.actions;
export const CartItems = (state) => state.cart.item;
export default cartSlice.reducer;
