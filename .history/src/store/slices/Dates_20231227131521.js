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



export const { Login, LOGOUT, UPDATE_PROFILE } = authSlice.actions;

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const user = (state) => state.auth.user;

export default authSlice.reducer;


