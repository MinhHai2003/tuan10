// slices/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: { items: [] },
  reducers: {
    setTodos: (state, action) => {
      state.items = action.payload;
    },
    addTodo: (state, action) => {
      state.items.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.todo_id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action) => {
      const index = state.items.findIndex(item => item.todo_id === action.payload.todo_id);
      if (index >= 0) state.items[index] = { ...state.items[index], ...action.payload };
    },
  },
});

export const { setTodos, addTodo, toggleTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;