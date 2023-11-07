import { createSlice } from '@reduxjs/toolkit';
import { ITodo } from '@/shared/assets/lib/ITodo';

const initialState = {
    todos: <ITodo[]>JSON.parse(localStorage.getItem('tasks') || '[{"id":"0","body":"Твоя первая заметка"}]'),
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
            localStorage.setItem('tasks', JSON.stringify(state.todos));
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            localStorage.setItem('tasks', JSON.stringify(state.todos));
        },
        compliteToogle: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            if (todo) switch ((todo)?.checked) {
                case false:
                    todo.checked = true;
                    break;
                default:
                    todo.checked = false;
                    break;
            }
            localStorage.setItem('tasks', JSON.stringify(state.todos));
        },
    }
});

export const { addTodo, removeTodo, compliteToogle } = todoSlice.actions;
export default todoSlice.reducer;