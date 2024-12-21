import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditTodo from "../components/AddEditTodo";
import TodoHead from "./TodoHead";
import TodoList from "../Todo/TodoList";
import { toggleAddTodoVisibility } from "../redux/uiSlice";

function TodoAppModel() {
    const dispatch = useDispatch();
    const { isAddTodoVisible } = useSelector((state) => state.ui);

    const toggleAddTodo = () => {
        dispatch(toggleAddTodoVisibility());
    };

    return (
        <div className="grid place-items-center h-screen bg-gray-100 overflow-hidden">
            <div className="h-[860px] relative bg-white shadow-lg">
                <TodoHead toggleAddTodo={toggleAddTodo} />
                {isAddTodoVisible && <AddEditTodo onCancel={toggleAddTodo} />}
                <TodoList />
            </div>
        </div>
    );
}

export default TodoAppModel;
