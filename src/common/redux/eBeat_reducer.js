import {createSlice} from "@reduxjs/toolkit";

export const ebeatSlice = createSlice({
    name: "ebeat",
    initialState: {
        reactivateScanner: true,
        isLocationsLoading: false,
    },
    reducers: {
        isReactivateScanner: (state, action) => {
            state.reactivateScanner = action.payload;
        },
        isLocationsRefresh: (state, action) => {
            state.isLocationsLoading = action.payload;
        },
    },
});

export const {isReactivateScanner, isLocationsRefresh} = ebeatSlice.actions;

export default ebeatSlice.reducer;
