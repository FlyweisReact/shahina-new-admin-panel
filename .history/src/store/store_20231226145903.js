/** @format */

import { configureStore } from "@reduxjs/toolkit";
import  appointmentSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
