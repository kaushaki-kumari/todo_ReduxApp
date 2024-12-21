import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTodo } from "../redux/todoSlice";
import TodoItem from "./TodoItem";
import AddEditTodo from "../components/AddEditTodo";
import DeleteTodo from "../components/DeleteTodo";

function TodoList() {
    const dispatch = useDispatch();
    const { todos, currentTodo, isDeleteModalOpen, todoIdToDelete } = useSelector(
        (state) => state.todos
    );

    const handleCancelEdit = () => {
        dispatch(setCurrentTodo(null));
    };

    return (
        <div>
            {todos.length === 0 ? (
                <p className="text-center text-xl text-gray-500 font-semibold">Add Task......</p>
            ) : (
                <ul className="list-group">
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}

            {currentTodo && (
                <AddEditTodo todo={currentTodo} onCancel={handleCancelEdit} />
            )}

            <DeleteTodo isOpen={isDeleteModalOpen} todoId={todoIdToDelete} />
        </div>
    );
}

export default TodoList;
