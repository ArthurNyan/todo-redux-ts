import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from '@/shared/assets/lib/ITodo';

const initialState = {
    todos: <ITodo[]>[
        { id: '2023-10-31T21:48:50.293Z', body: 'First note', checked: false },
        { id: '2023-10-31T21:50:17.736Z', body: 'Second note', checked: true }
    ],
};

export const todoSlice = createSlice({
    name: 'TodoSlice',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({
                id: new Date().toISOString(),
                body: action.payload.body, 
                checked: false,
            });
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        compliteToogle: (state, action) => {
            state.todos[action.payload.id].checked = !state.todos[action.payload.id].checked;
        },
    }
});

export const { addTodo, removeTodo, compliteToogle } = todoSlice.actions;
export default todoSlice.reducer;