import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../features/example/exampleSlice';
import { homeReducer } from '../pages/home/homeReducer';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    home: homeReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;



