/** @format */

import { createSlice } from "@reduxjs/toolkit";

const Localdata = localStorage.getItem("cart");


try {
  cartData = JSON.parse(Localdata);
} catch (error) {
  console.error("Invalid JSON in localStorage:", error);
}

const cartSlice = createSlice({
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
