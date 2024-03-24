import { createSlice } from "@reduxjs/toolkit";
import { Result } from "../Types/StudentType";

const ResultSlice = createSlice({
    name: "ResultSlice",
    initialState: { value: [], loading: false },
    reducers: {
        steResult: (state, action) => {
            const D = action.payload;
            D?.forEach((V: Result) => {
                V.Result = "Pass";
            });
            state.value = D;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { steResult ,setLoading } = ResultSlice.actions;

export default ResultSlice.reducer;
