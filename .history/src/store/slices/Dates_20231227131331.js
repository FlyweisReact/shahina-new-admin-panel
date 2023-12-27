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
export const dates 

export  default datesSlice.reducer


