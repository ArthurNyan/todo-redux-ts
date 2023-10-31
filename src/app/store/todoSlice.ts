import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from '@/shared/assets/lib/ITodo';

const initialState = {
    todos: <ITodo[]>[{ id: 1, body: 'First note', checked: false }, { id: 2, body: 'Second note', checked: false }]
};

export const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        compliteToogle: (state, action) => {
            state.todos[action.payload].checked = !state.todos[action.payload].checked;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    }
});

export const { addTodo, removeTodo, compliteToogle } = todoSlice.actions;
export default todoSlice.reducer;