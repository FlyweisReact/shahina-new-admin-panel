import { configureStore } from '@reduxjs/toolkit'
import { datesSlice } from './slices/Dates'

export default store = configureStore({
    reducer : {
        dates : datesSlice
    }
})