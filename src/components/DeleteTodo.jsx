import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setDeleteModalState } from "../redux/todoSlice";

function DeleteTodo() {
    const dispatch = useDispatch();
    const { isDeleteModalOpen, todoIdToDelete } = useSelector((state) => state.todos);

    if (!isDeleteModalOpen) return null;

    const handleDelete = () => {
        if (todoIdToDelete !== null) {
            dispatch(deleteTodo(todoIdToDelete));
            dispatch(setDeleteModalState(false));
        }
    };

    const handleCancel = () => {
        dispatch(setDeleteModalState(false));
    };

    return (
        <div className="bg-red-50 p-6 rounded-lg shadow-lg w-80 max-w-full m-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Are you sure you want to delete this todo?
            </h2>
            <div className="flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    onClick={handleCancel}>
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-red-600 transition-colors"
                    onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DeleteTodo;
