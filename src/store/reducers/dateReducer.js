import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
    name: "date",
    initialState: new Date().toLocaleDateString(),
    reducers: {
        setDate(state, actions) {
            return actions.payload;
        },
    },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
