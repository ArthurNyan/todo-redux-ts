import { IPatchTodo } from '@/shared/assets/lib/IPatchTodo';
import { IPostTodo } from '@/shared/assets/lib/IPostTodo';
import { ITodo } from '@/shared/assets/lib/ITodo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_NOTE_API }),
    tagTypes: ['Notes'],
    endpoints: (builder) => ({
        getNoSqlTodo: builder.query<ITodo[], string>({
            query: (id) => `/notes?userId=${id}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Notes' as const, id })),
                        { type: 'Notes', id: 'LIST' },
                    ]
                    : [{ type: 'Notes', id: 'LIST' }],
        }),
        addTodo: builder.mutation<{ sucsess: boolean }, IPostTodo>({
            query: (body) => ({
                url: '/notes',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
        }),
        removeTodo: builder.mutation<{ sucsess: boolean }, number>({
            query: id => ({
                url: `/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Notes', id: 'LIST' }]
        }),
        patchTodo: builder.mutation<{ sucsess: boolean }, IPatchTodo>({
            query: (body) => ({
                url: `/notes/${body.id}`,
                method: 'PATCH',
                body: { checked: body.checked },
            }),
            invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
        }),
    }),
});

export const { useGetNoSqlTodoQuery, useAddTodoMutation, useRemoveTodoMutation, usePatchTodoMutation } = notesApi;