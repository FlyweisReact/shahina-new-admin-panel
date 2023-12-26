/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { appointments } from "./cartSlice";

export const store = configureStore({
  reducer: {
    user,
    common,
    quiz,
    auth: authSlice,
    cart: cartSlice,
    dummyCart: DummyCart,
    serviceCart: ServiceCart,
    offer: bannerSlice,
  },
});
