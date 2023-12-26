/** @format */

import { createSlice } from "@reduxjs/toolkit";

const  = createSlice({
  name: "cart",
  initialState: {
    item: cartData,
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
