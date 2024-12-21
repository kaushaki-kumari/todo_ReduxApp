import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice'; 
import timeReducer from './timeSlice'; 
import uiReducer from './uiSlice'; 
import formReducer from "./formSlice";

const store = configureStore({
  reducer: {
    todos: todoReducer,
    time: timeReducer,
    ui: uiReducer,
    form: formReducer,
  },
});

export default store;
