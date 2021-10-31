import React, { useState } from "react";
import {
    Checkbox,
    Header,
    List,
    Dropdown,
    Input,
    Button,
    Icon,
    Segment,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import "./TodoListStyle.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addWork, completeWork } from "../store/reducers/todoListReducer";
import { useSelector } from "react-redux";
import GROUP_ENUM from "../constants/GROUP_ENUM";

function TodoItem(props) {
    return (
        <List.Item
            className={clsx("TodoItemStyle", props.complete && "complete")}
        >
            <List.Icon verticalAlign="middle">
                <Checkbox
                    checked={props.complete}
                    onChange={(e, { checked }) => {
                        if (checked == true) props.onComplete();
                    }}
                ></Checkbox>
            </List.Icon>
            <List.Content>
                <List.Header>{props.content}</List.Header>
            </List.Content>
        </List.Item>
    );
}
TodoItem.propTypes = {
    content: PropTypes.string,
    complete: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
};

function TodoGroup(props) {
    return (
        <List.Item>
            <List divided relaxed className="TodoGroup" style={{}}>
                <Header as="h3">{props.title}</Header>
                {props.children}
            </List>
        </List.Item>
    );
}
TodoGroup.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
};

function AddWork() {
    let [group, setGroup] = useState(GROUP_ENUM.Todo);
    let [title, setTitle] = useState("");

    const date = useSelector((state) => state.date);
    const dispatch = useDispatch();

    function reset() {
        setGroup(GROUP_ENUM.Todo);
        setTitle("");
    }
    function addWorkHandle() {
        dispatch(
            addWork({
                title,
                group,
                date,
            })
        );
        reset();
    }
    return (
        <Segment>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                }}
            >
                <Dropdown
                    search
                    selection
                    options={Object.keys(GROUP_ENUM).map((el) => ({
                        value: el,
                        text: el,
                    }))}
                    value={group}
                    onChange={(e, { value }) => {
                        setGroup(value);
                    }}
                ></Dropdown>
                <Input
                    value={title}
                    onChange={(e, { value }) => setTitle(value)}
                ></Input>
                <Button
                    style={{ background: "teal", color: "white" }}
                    onClick={addWorkHandle}
                >
                    <Icon name="add"></Icon>
                    <span>Thêm công việc</span>
                </Button>
            </div>
        </Segment>
    );
}

export default function TodoList() {
    const date = useSelector((state) => state.date);
    const todoList = useSelector((state) => state.todo[date]);
    let dispatch = useDispatch();
    return (
        <List>
            <AddWork></AddWork>
            {Object.keys(GROUP_ENUM).map((group, index) => {
                let works =
                    (todoList ? todoList[GROUP_ENUM[group]] : undefined) || [];
                let title = GROUP_ENUM[group];
                return (
                    <TodoGroup key={index} title={title}>
                        {works.map((work, index) => {
                            return (
                                <TodoItem
                                    key={index}
                                    onComplete={() => {
                                        console.log("work");
                                        dispatch(
                                            completeWork({ date, group, index })
                                        );
                                    }}
                                    content={work.title}
                                    complete={work.complete}
                                ></TodoItem>
                            );
                        })}
                    </TodoGroup>
                );
            })}
        </List>
    );
}
