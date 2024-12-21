import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todoDetails: { title: '', alarmTime: '' },
  isSubmitted: false,
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setTodoDetails: (state, action) => {
      state.todoDetails = action.payload;
    },
    resetForm: (state) => {
      state.todoDetails = { title: '', alarmTime: '' };
      state.isSubmitted = false;
      state.errors = {};
    },
    initializeForm: (state, action) => {
      if (action.payload) {
        state.todoDetails = action.payload;
      } else {
        state.todoDetails = { title: '', alarmTime: '' };
      }
    },
    setIsSubmitted: (state, action) => {
      state.isSubmitted = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const { setTodoDetails, resetForm, initializeForm, setIsSubmitted, setErrors } = formSlice.actions;
export default formSlice.reducer;
