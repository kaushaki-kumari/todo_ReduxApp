import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isAddTodoVisible: false,
  },
  reducers: {
    toggleAddTodoVisibility: (state) => {
      state.isAddTodoVisible = !state.isAddTodoVisible;
    },
  },
});

export const {
  toggleAddTodoVisibility,
} = uiSlice.actions;

export default uiSlice.reducer;
