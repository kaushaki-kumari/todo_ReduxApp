import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditTodo from "../components/AddEditTodo";
import TodoHead from "./TodoHead";
import TodoList from "../Todo/TodoList";
import { setTodos } from "../redux/todoSlice";
import { toggleAddTodoVisibility } from "../redux/uiSlice";

function TodoAppModel() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const { isAddTodoVisible } = useSelector((state) => state.ui);

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos) {
            dispatch(setTodos(savedTodos));
        }
    }, [dispatch]);

    useEffect(() => {
        if (todos.length === 0) {
            localStorage.removeItem("todos");
        } else {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const toggleAddTodo = () => {
        dispatch(toggleAddTodoVisibility());
    };

    return (
        <div className="grid place-items-center h-screen bg-gray-100 overflow-hidden">
            <div className="h-[860px] relative bg-white shadow-lg">
                <TodoHead toggleAddTodo={toggleAddTodo} />
                {isAddTodoVisible && (
                    <AddEditTodo
                        onCancel={toggleAddTodo}
                    />
                )}
                <TodoList />
            </div>
        </div>
    );
}

export default TodoAppModel;
