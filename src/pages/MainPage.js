import React from "react";
import "react-calendar/dist/Calendar.css";
import "./MainPageStyle.css";
import Calendar from "react-calendar";
import TodoList from "../components/TodoList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDate } from "../store/reducers/dateReducer";

export default function MainPage() {
    let date = useSelector((state) => state.date);
    console.log(date);
    let dispatch = useDispatch();
    function setCalendar(date) {
        dispatch(setDate(date.toLocaleDateString()));
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
            <Calendar
                className="CalendarStyle"
                value={new Date(date)}
                onChange={(date) => setCalendar(date)}
            ></Calendar>
            <div>
                <div>{date}</div>
                <TodoList></TodoList>
            </div>
            <div>?</div>
        </div>
    );
}
