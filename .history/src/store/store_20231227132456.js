/** @format */
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    dates : "dateSlice"
  },
});

export default store;
