import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
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
        alarmColor: "bg-[#B678FF]",
      };
      state.todos.push(newTodo);
    },
    editTodo: (state, action) => {
      const { id, title, alarmTime, alarmColor } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.alarmTime = alarmTime;
        todo.alarmColor = alarmColor;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompletion: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.alarmColor = todo.completed ? "bg-green-500" : "bg-[#B678FF]";
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setCurrentTodo(state, action) {
      state.currentTodo = action.payload;
    },
    setDeleteModalState: (state, action) => {
      state.isDeleteModalOpen = action.payload.isOpen; 
      if (!action.payload.isOpen) {
        state.todoIdToDelete = null; 
      }
    },
    setTodoIdToDelete: (state, action) => {
      state.todoIdToDelete = action.payload; 
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
} = todoSlice.actions;

export default todoSlice.reducer;
