/** @format */

import { configureStore } from "@reduxjs/toolkit";
import quiz from "./quizSlice";
import common from "./commonSlice";
import user from "./userSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import DummyCart from "./DummyCart";
import ServiceCart from "./DummySerivce";
import bannerSlice from './BannerSlice';

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
