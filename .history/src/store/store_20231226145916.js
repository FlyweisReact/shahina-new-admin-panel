/** @format */

import { configureStore } from "@reduxjs/toolkit";
import  appointmentSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    appointment: appointmentSlice,
  },
});
