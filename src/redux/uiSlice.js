import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isAddTodoVisible: false,
    isDeleteModalOpen: false,
    todoIdToDelete: null,  
  },
  reducers: {
    toggleAddTodoVisibility: (state) => {
      state.isAddTodoVisible = !state.isAddTodoVisible;
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
  toggleAddTodoVisibility,
  setDeleteModalState,
  setTodoIdToDelete,
} = uiSlice.actions;

export default uiSlice.reducer;
