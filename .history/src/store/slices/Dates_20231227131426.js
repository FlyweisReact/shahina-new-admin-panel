import { createSlice } from '@reduxjs/toolkit'

export const datesSlice = createSlice({
    name : 'dates' , 
    initialState : {
        item : []
    } , 
    reducers : {
        getDates : (state , action) => {
            state.item = action.payload
        }
    }
})

export const { getDates } = datesSlice.actions
export const dates = (state) => state.dates.item
export  default datesSlice.reducer

/** @format */

import { createSlice } from "@reduxjs/toolkit";

const savedData = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedData ? savedData : null,
    isAuthenticated: savedData ? true : false,
  },
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    LOGOUT: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    UPDATE_PROFILE: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { Login, LOGOUT, UPDATE_PROFILE } = authSlice.actions;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const user = (state) => state.auth.user;

export default authSlice.reducer;



