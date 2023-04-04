const { createSlice } = require('@reduxjs/toolkit');

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        loginSuccess: (state, action, navigate) => {
            state.auth.user = action.payload;
        },
    },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
