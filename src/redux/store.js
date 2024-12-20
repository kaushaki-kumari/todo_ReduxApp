import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice'; 
import timeReducer from './timeSlice'; 
import uiReducer from './uiSlice'; 

const store = configureStore({
  reducer: {
    todos: todoReducer,
    time: timeReducer,
    ui: uiReducer,
  },
});

export default store;
