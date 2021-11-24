import {createSlice} from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: "officer",
    initialState: {
        isShowAllOfficers: false,
        isBelowOfficers: true,
    },
    reducers: {
        setShowAllOfficers: (state, action) => {
            state.isShowAllOfficers = action.payload;
        },
        setBelowOfficers: (state, action) => {
            state.isBelowOfficers = action.payload;
        },
    },
});

export const {setShowAllOfficers, setBelowOfficers} = commonSlice.actions;

export default commonSlice.reducer;
