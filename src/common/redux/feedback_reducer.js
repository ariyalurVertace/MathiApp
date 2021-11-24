import {createSlice} from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState: {
        feedbackList: [],
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
            feedbackTypes: [],
        },
        feedbackTypes: [],
    },
    reducers: {
        setFeedbackList: (state, action) => {
            state.feedbackList = action.payload;
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
        setFeedbackTypeFilter: (state, action) => {
            state.feedbackTypes = action.payload;
        },
    },
});

export const {
    setFeedbackList,
    setIsSubmitted,
    setIsNotPossible,
    setIsImplemented,
    setIsWorkinProgress,
    setIsWillbeAddressed,
    setLoadData,
    setFeedbackTypeFilter,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
