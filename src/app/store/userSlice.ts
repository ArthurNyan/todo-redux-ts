import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user') || '{ "email": null, "token": null, "id": null}'),
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user.email = action.payload.email;
            state.user.token = action.payload.token;
            state.user.id = action.payload.id;
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        removeUser(state) {
            state.user.email = null;
            state.user.token = null;
            state.user.id = null;
            localStorage.removeItem('user');
        },
    },
});

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;