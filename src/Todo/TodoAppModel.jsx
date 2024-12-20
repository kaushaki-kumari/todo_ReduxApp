import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditTodo from "../components/AddEditTodo";
import TodoHead from "./TodoHead";
import TodoList from "../Todo/TodoList";
import DeleteTodo from "../components/DeleteTodo";
import { setTodos, addTodo, editTodo } from "../redux/todoSlice";
import { toggleAddTodoVisibility } from "../redux/uiSlice";
import { setDeleteModalState, setTodoIdToDelete } from "../redux/uiSlice";  

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

    const addTodoHandler = (title, alarmTime) => {
        if (title.trim()) {
            const newTodo = {
                id: Date.now(),
                title,
                completed: false,
                alarmTime,
            };
            dispatch(addTodo(newTodo));
            dispatch(toggleAddTodoVisibility());
        }
    };

    const editTodoHandler = (id, title, alarmTime) => {
        const updatedTodo = {
            id,
            title,
            alarmTime,
            completed: false,
        };
        dispatch(editTodo(updatedTodo));
        dispatch(toggleAddTodoVisibility());
    };

    const handleDeleteClick = (todoId) => {
        console.log('Dispatching setTodoIdToDelete:', todoId);
        dispatch(setTodoIdToDelete(todoId));  
        dispatch(setDeleteModalState({ isOpen: true }));  
    };

    return (
        <div className="grid place-items-center h-screen bg-gray-100 overflow-hidden">
            <div className="h-[860px] relative bg-white shadow-lg">
                <TodoHead toggleAddTodo={toggleAddTodo} />
                {isAddTodoVisible && (
                    <AddEditTodo
                        onAddTodo={addTodoHandler}
                        onSaveTodo={editTodoHandler}
                        onCancel={toggleAddTodo}
                    />
                )}
                <TodoList onDeleteClick={handleDeleteClick} />
            </div>
            <DeleteTodo />
        </div>
    );
}

export default TodoAppModel;
