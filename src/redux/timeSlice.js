import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const getCurrentTime = () => moment().format("HH:mm");

const initialState = {
  currentTime: getCurrentTime(),
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setCurrentTime: (state) => {
      state.currentTime = getCurrentTime();
    },
  },
});

export const { setCurrentTime } = timeSlice.actions;
export default timeSlice.reducer;
