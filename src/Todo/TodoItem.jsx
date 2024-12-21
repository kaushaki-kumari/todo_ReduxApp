import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    toggleTodoCompletion,
    setCurrentTodo,
    setDeleteModalState,
    setTodoIdToDelete,
    updateTodosAlarmColors,
} from "../redux/todoSlice";
import { IoIosAlarm, IoMdCreate, IoIosTrash } from "react-icons/io";
import moment from "moment";

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const formatTime = (time) => moment(time).format("YYYY-MM-DD HH:mm");

    const handleAction = (action) => {
        switch (action) {
            case "toggleCompletion":
                dispatch(toggleTodoCompletion(todo.id));
                break;
            case "edit":
                dispatch(setCurrentTodo(todo));
                break;
            case "delete":
                dispatch(setTodoIdToDelete(todo.id));
                dispatch(setDeleteModalState(true));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateTodosAlarmColors());
        }, 10000);
        return () => clearInterval(interval);
    });

    return (
        <li className="d-flex justify-content-between align-items-center">
            <div className="flex items-center w-full ml-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleAction("toggleCompletion")}
                    className="w-5 h-5 mr-2 cursor-pointer rounded-full border-2 checked:bg-blue-400 appearance-none"
                />
                <div className="list-group-item w-80 my-1 py-2">
                    <div className="flex justify-between items-center">
                        <span className="break-all w-10/12">{todo.title}</span>
                        <div
                            className={`w-3 h-3 rounded-full mr-2 ${todo.alarmColor || "bg-gray-500"
                                }`}
                        ></div>
                        <button onClick={() => handleAction("edit")}>
                            <IoMdCreate className="text-black w-5 h-5 hover:text-blue-700" />
                        </button>
                        <button onClick={() => handleAction("delete")}>
                            <IoIosTrash className="text-black w-5 h-5 hover:text-red-600" />
                        </button>
                    </div>
                    {todo.alarmTime && (
                        <div className="flex items-center">
                            <IoIosAlarm className="text-gray-400 mr-1" />
                            <span className="text-xs text-gray-400">
                                {formatTime(todo.alarmTime)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
}

export default TodoItem;
