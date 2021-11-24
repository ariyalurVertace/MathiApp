import {createSlice} from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: "request",
    initialState: {
        requestList: [],
        isSubmitted: false,
        isNotPossible: false,
        isImplemented: false,
        isWorkinProgress: false,
        isWillbeAddressed: false,
        isLoadDate: false,
        filterLessState: {
            isSubmitted: false,
            isNotPossible: false,
            isImplemented: false,
            isWorkinProgress: false,
            isWillbeAddressed: false,
            requestTypes: [],
        },
        requestTypes: [],
    },
    reducers: {
        setRequestList: (state, action) => {
            state.requestList = action.payload;
        },
        setIsSubmitted: (state, action) => {
            state.isSubmitted = action.payload;
        },
        setIsNotPossible: (state, action) => {
            state.isNotPossible = action.payload;
        },
        setIsImplemented: (state, action) => {
            state.isImplemented = action.payload;
        },
        setIsWorkinProgress: (state, action) => {
            state.isWorkinProgress = action.payload;
        },
        setIsWillbeAddressed: (state, action) => {
            state.isWillbeAddressed = action.payload;
        },
        setLoadData: (state, action) => {
            state.isLoadDate = action.payload;
        },
        setReqestTypeFilter: (state, action) => {
            state.requestTypes = action.payload;
        },
    },
});

export const {
    setRequestList,
    setIsSubmitted,
    setIsNotPossible,
    setIsImplemented,
    setIsWorkinProgress,
    setIsWillbeAddressed,
    setLoadData,
    setReqestTypeFilter,
} = requestSlice.actions;

export default requestSlice.reducer;
