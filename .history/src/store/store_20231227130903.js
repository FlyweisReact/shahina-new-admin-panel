import { configureStore } from '@reduxjs/toolkit'
import { datesSlice } from './slices/Dates'

export const store = configureStore({
    reducer : {
        dates : datesSlice
    }
})