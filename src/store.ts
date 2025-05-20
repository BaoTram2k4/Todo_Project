// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './features/todos/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Types cho RootState và AppDispatch để dùng ở các hook
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
