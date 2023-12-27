/** @format */
import { configureStore } from "@reduxjs/toolkit";
import dateSlice from "./Slices/dateSlice";

const store = configureStore({
  reducer: {
    dates: dateSlice,
    modal : 
  },
});

export default store;
