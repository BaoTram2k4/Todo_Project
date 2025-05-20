import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "./todoTypes";

interface TodoState {
  todos: Todo[];
}

const loadTodos = (): Todo[] => {
  try {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  } catch {
    return [];
  }
};

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const initialState: TodoState = {
  todos: loadTodos(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      saveTodos(state.todos)
    },
    addTodo: (state, action: PayloadAction<string>) => {
      if (!action.payload.trim()) return; 
      const newTodo: Todo = {
        id: Date.now(),
        title: action.payload.trim(),
        completed: false,
      };
      state.todos.push(newTodo);
      saveTodos(state.todos);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodos(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveTodos(state.todos);
    },
    updateTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload;
      if (!title.trim()) return; 
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.title = title.trim();
        saveTodos(state.todos);
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;