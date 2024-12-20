import { useDispatch, useSelector } from "react-redux";
import { setCurrentTodo, deleteTodo, setDeleteModalState, setTodoIdToDelete } from "../redux/todoSlice";
import TodoItem from "./TodoItem";
import AddEditTodo from "../components/AddEditTodo";
import DeleteTodo from "../components/DeleteTodo";

function TodoList() {
    const dispatch = useDispatch();
    const { todos, currentTodo, isDeleteModalOpen, todoIdToDelete } = useSelector((state) => state.todos);

    const handleEditTodo = (todo) => {
        dispatch(setCurrentTodo(todo));
    };

    const handleCancelEdit = () => {
        dispatch(setCurrentTodo(null));
    };

    const handleDeleteClick = (todoId) => {
        dispatch(setTodoIdToDelete(todoId));
        dispatch(setDeleteModalState(true));
    };

    const handleCloseDeleteModal = () => {
        dispatch(setDeleteModalState(false));
        dispatch(setTodoIdToDelete(null));
    };

    return (
        <div>
            <ul className="list-group">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onEdit={handleEditTodo}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </ul>

            {currentTodo && (
                <AddEditTodo
                    todo={currentTodo}
                    onCancel={handleCancelEdit}
                />
            )}

            <DeleteTodo
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                todoId={todoIdToDelete}
                onConfirm={() => dispatch(deleteTodo(todoIdToDelete))}
            />
        </div>
    );
}

export default TodoList;
