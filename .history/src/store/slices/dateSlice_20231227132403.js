/** @format */

import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "dates",
  initialState: {
    item: null,
  },
  reducers: {
    getCartItems: (state, action) => {
      state.item = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
  },
});

export const { getCartItems } = cartSlice.actions;
export const CartItems = (state) => state.cart.item;
export default cartSlice.reducer;
