import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "./reducers/todoListReducer";
import dateReducer from "./reducers/dateReducer";

const store = configureStore({
    reducer: {
        todo: todoListReducer,
        date: dateReducer,
    },
});
export default store;
