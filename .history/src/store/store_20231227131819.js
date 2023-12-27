/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { dates } from "./slices/Dates";

export default configureStore({
  reducer: {
    dates: dates,
  },
});
