import { createSlice } from "@reduxjs/toolkit";
import GROUP_ENUM from "../../constants/GROUP_ENUM";

const DEFAULT_GROUP = GROUP_ENUM.Todo;

function loadTodoList() {
    return JSON.parse(window.localStorage.getItem("todolist")) || {};
}
function saveTodoList(todoList) {
    window.localStorage.setItem("todolist", todoList || {});
}

const todoListSlice = createSlice({
    name: "todo",
    initialState: loadTodoList(),
    reducers: {
        addWork: (state, actions) => {
            let { date, title, group } = actions.payload;
            if (new Date(date) < new Date(new Date().toLocaleDateString()))
                return state;
            if (!state[date] || "object" !== typeof state[date]) {
                state[date] = {};
            }

            if (!group) group = DEFAULT_GROUP;
            if (!Object.keys(GROUP_ENUM).includes(group)) return state;
            if (!state[date][group] || !Array.isArray(state[date][group])) {
                state[date][group] = [];
            }
            state[date][group].push({ title, complete: false });
            saveTodoList(JSON.stringify(state));
            return state;
        },
        completeWork: (state, actions) => {
            let { date, group, index } = actions.payload;

            if (new Date(date) < new Date(new Date().toLocaleDateString()))
                return state;

            if (!state[date]) return state;
            if (!state[date][group]) return state;
            if (!state[date][group][index]) return state;
            state[date][group][index].complete = true;
            saveTodoList(JSON.stringify(state));
            return state;
        },
    },
});

export const { addWork, completeWork } = todoListSlice.actions;
export default todoListSlice.reducer;
