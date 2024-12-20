import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setDeleteModalState } from "../redux/todoSlice";

function DeleteTodo() {
    const dispatch = useDispatch();
    const { isDeleteModalOpen, todoIdToDelete } = useSelector(state => state.ui);  

    if (!isDeleteModalOpen) return null;

    const handleDelete = () => {
        if (todoIdToDelete !== null) {
            dispatch(deleteTodo(todoIdToDelete));  
            dispatch(setDeleteModalState({ isOpen: false }));  
        }
    };

    const handleCancel = () => {
        dispatch(setDeleteModalState({ isOpen: false }));  
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg mb-4">Are you sure you want to delete this todo?</h2>
                <div className="flex justify-between">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-md mr-2 hover:bg-slate-600 hover:text-white"
                        onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                        onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTodo;
