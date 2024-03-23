import { configureStore } from "@reduxjs/toolkit";
import ResultSlice from "./ResultSlice";

// import socketSlice from "./socketSlice";

export const Store = configureStore({
    reducer: {
        Result: ResultSlice,
    },
});
