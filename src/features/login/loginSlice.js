import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        id: null,
        username: null,
        token: null
    },
    reducers: {
        loginReducer: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.token = action.payload.token;
        }
    }
});

export const {loginReducer} = loginSlice.actions;
export default loginSlice.reducer;