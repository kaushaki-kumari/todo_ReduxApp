import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setCurrentTime } = timeSlice.actions;
export default timeSlice.reducer;
