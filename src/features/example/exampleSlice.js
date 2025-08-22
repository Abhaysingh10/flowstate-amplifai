import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

export const { increment, decrement, reset } = exampleSlice.actions;
export default exampleSlice.reducer;



