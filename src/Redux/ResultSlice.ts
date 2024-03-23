import { createSlice } from "@reduxjs/toolkit";
import { Result } from "../Types/StudentType";


const ResultSlice = createSlice({
    name: "ResultSlice",
    initialState: { value: [] },
    reducers: {
        steResult: (state, action) => {
            const D = action.payload;
            D?.forEach((V:Result) => { V.Result = "Pass"} );
            state.value = D
        },
    },
});

export const { steResult } = ResultSlice.actions;

export default ResultSlice.reducer;
