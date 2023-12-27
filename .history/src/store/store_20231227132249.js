/** @format */
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart : cartSlice
  },
});

export default store;
