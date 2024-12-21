import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment'; 

const initialState = {
  currentTime: moment().format('HH:mm'), 
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

