import {createSlice} from "@reduxjs/toolkit";

export const welfareSlice = createSlice({
    name: "welfare",
    initialState: {
        welfarePageLoading: false,
        personPageLoading: false,
        welfareRequestLoading: false,
        subtypePageLoading: false,
        requestDetailsPageLoading: false,
    },
    reducers: {
        setWelfarePageLoading: (state, action) => {
            state.welfarePageLoading = action.payload;
        },
        setPersonPageLoading: (state, action) => {
            state.personPageLoading = action.payload;
        },
        setWelfareRequestLoading: (state, action) => {
            state.welfareRequestLoading = action.payload;
        },
        setSubtypePageLoading: (state, action) => {
            state.subtypePageLoading = action.payload;
        },
        requestDetailsPageLoading: (state, action) => {
            state.requestDetailsPageLoading = action.payload;
        },
    },
});

export const {
    setWelfarePageLoading,
    setPersonPageLoading,
    setWelfareRequestLoading,
    setSubtypePageLoading,
    requestDetailsPageLoading,
} = welfareSlice.actions;

export default welfareSlice.reducer;
