import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: loadTodosFromLocalStorage(), 
    currentTodo: null,
    isDeleteModalOpen: false,
    todoIdToDelete: null,
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        alarmTime: action.payload.alarmTime,
        completed: false,
        alarmColor: getAlarmColor(action.payload.alarmTime, false),
      };
      state.todos.push(newTodo);
    },
    editTodo: (state, action) => {
      const { id, title, alarmTime } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.alarmTime = alarmTime;
        todo.alarmColor = getAlarmColor(alarmTime, todo.completed);
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.alarmColor = getAlarmColor(todo.alarmTime, todo.completed);
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setCurrentTodo(state, action) {
      state.currentTodo = action.payload;
    },
    setDeleteModalState: (state, action) => {
      state.isDeleteModalOpen = action.payload;
      if (!action.payload) {
        state.todoIdToDelete = null;
      }
    },
    setTodoIdToDelete: (state, action) => {
      state.todoIdToDelete = action.payload;
    },
    updateAlarmColor: (state, action) => {
      const { id, alarmColor } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.alarmColor = alarmColor;
      }
    },
    updateTodosAlarmColors: (state) => {
      const currentTime = moment();
      state.todos.forEach((todo) => {
        if (!todo.completed && moment(todo.alarmTime).isBefore(currentTime)) {
          todo.alarmColor = "bg-red-500";
        }
      });
    },
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodoCompletion,
  setTodos,
  setCurrentTodo,
  setDeleteModalState,
  setTodoIdToDelete,
  updateAlarmColor,
  updateTodosAlarmColors,
} = todoSlice.actions;

export default todoSlice.reducer;

function getAlarmColor(alarmTime, completed) {
  const currentTime = moment();
  const alarmMoment = moment(alarmTime);

  if (completed) {
    return "bg-green-500";
  }

  if (alarmMoment.isBefore(currentTime)) {
    return "bg-red-500";
  }

  return "bg-[#B678FF]";
}
