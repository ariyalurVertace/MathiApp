import {createSlice} from "@reduxjs/toolkit";

export const reachmeSlice = createSlice({
    name: "reachme",
    initialState: {
        requestList: [],
        isActiveVolunteerRefresh: false,
        isPendingVolunteerRefresh: false,
        isBlockedVolunteerRefresh: false,
        isPersonSeleted: false,
    },
    reducers: {
        setRequest: (state, action) => {
            state.requestList = action.payload;
        },
        setActiveVolunteerRefresh: (state, action) => {
            state.isActiveVolunteerRefresh = action.payload;
        },
        setPendingVolunteerRefresh: (state, action) => {
            state.isPendingVolunteerRefresh = action.payload;
        },
        setBlockedVolunteerRefresh: (state, action) => {
            state.isBlockedVolunteerRefresh = action.payload;
        },
        setIsPersonSelected: (state, action) => {
            state.isPersonSeleted = action.payload;
        },
    },
});

export const {
    setRequest,
    setActiveVolunteerRefresh,
    setPendingVolunteerRefresh,
    setBlockedVolunteerRefresh,
    setIsPersonSelected,
} = reachmeSlice.actions;

export default reachmeSlice.reducer;
