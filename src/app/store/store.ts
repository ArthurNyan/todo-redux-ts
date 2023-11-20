import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { notesApi } from './notesApi';

export const store = configureStore({
    reducer: {
        user: userSlice,
        [notesApi.reducerPath]: notesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;