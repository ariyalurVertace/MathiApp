import {createSlice} from "@reduxjs/toolkit";

export const commonSlice = createSlice({
    name: "common",
    initialState: {
        isPageLoading: false,
        snackbarText: "",
        language: "English",
        labels: [],
        user: {},
        isScanReset: false,
    },
    reducers: {
        setSnackbarText: (state, action) => {
            state.snackbarText = action.payload;
        },

        setLoader: (state, action) => {
            state.isPageLoading = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setLabels: (state, action) => {
            state.labels = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setScannerReset: (state, action) => {
            state.isScanReset = action.payload;
        },
    },
});

export const {
    setSnackbarText,
    setLoader,
    setLanguage,
    setLabels,
    setUser,
    setScannerReset,
} = commonSlice.actions;

export default commonSlice.reducer;
