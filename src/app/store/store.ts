import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';
import userSlice from './userSlice';
import { notesApi } from './notesApi';

export const store = configureStore({
    reducer: {
        todo: todoSlice,
        user: userSlice,
        [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;