import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../context/AuthSlice.jsx";
import bookingReducer from "../context/bookingSlice.jsx";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        booking: bookingReducer,
    }
});

export default store;
